import { EmailInUseError } from "../../../domain/error/email-in-use-error";
import { UnexpectedError } from "../../../domain/error/unexpected-error";
import { mockAccountModel } from "../../../domain/tests/mock-account";
import { mockAddAccountParams } from "../../../domain/tests/mock-add-account";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { HttpPostClientSpy } from "../../tests/mock-http";
import { RemoteAddAccount } from "./remote-add-account";

type SutTypes = {
  sut: RemoteAddAccount,
  httpPostClientSpy: HttpPostClientSpy<RemoteAddAccount.Model>
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RemoteAddAccount.Model>();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('Should call httpPostClient with correct url', async () => {
    const url = 'other_url';
    const { sut, httpPostClientSpy } = makeSut(url);
    httpPostClientSpy.response = {
      ...httpPostClientSpy.response,
      body: {
        accessToken: 'access_Token',
        name: 'any_name'
      }
    };
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  })

  test('Should call httpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      ...httpPostClientSpy.response,
      body: {
        accessToken: 'access_Token',
        name: 'any_name'
      }
    };
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  })

  test('Should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should return an AddAccount.Model if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const accountModelMock = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: accountModelMock
    };
    const account = await sut.add(mockAddAccountParams());
    expect(account).toEqual(accountModelMock);
  })
});
