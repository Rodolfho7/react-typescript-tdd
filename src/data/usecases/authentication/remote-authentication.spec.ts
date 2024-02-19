import { InvalidCredentialsError } from "../../../domain/error/invalid-credentials-error";
import { UnexpectedError } from "../../../domain/error/unexpected-error";
import { mockAccountModel, mockAuthentication } from "../../../domain/tests/mock-account";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { HttpPostClientSpy } from "../../tests/mock-http";
import { RemoteAuthentication } from "./remote-authentication";

type SutTypes = {
  sut: RemoteAuthentication,
  httpPostClientSpy: HttpPostClientSpy<RemoteAuthentication.Model>
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RemoteAuthentication.Model>();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call httpPostClient with correct url', async () => {
    const url = 'other_url';
    const { sut, httpPostClientSpy } = makeSut(url);
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
    expect(httpPostClientSpy.url).toBe(url);
  })

  test('Should call httpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should throw InvalidCredentialError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should return an Authentication.Model if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const accountModelMock = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: accountModelMock
    };
    const account = await sut.auth(mockAuthentication());
    expect(account).toEqual(accountModelMock);
  })
})
