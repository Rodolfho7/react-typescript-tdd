import { HttpGetParams } from "../../../data/protocols/http/http-get-client";
import { HttpStatusCode } from "../../../data/protocols/http/http-response";
import { GetStorageSpy } from "../../../data/tests/mock-cache";
import { HttpGetClientSpy, mockGetRequest } from "../../../data/tests/mock-http";
import { mockAccountModel } from "../../../domain/tests/mock-account";
import { AuthorizeHttpGetClientDecorator } from "./authorize-http-get-client-decorator";

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator,
  getStorageSpy: GetStorageSpy,
  httpGetClientSpy: HttpGetClientSpy<any>
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy);
  return { sut, getStorageSpy, httpGetClientSpy };
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('account');
  })

  test('Should not add headers if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpRequest: HttpGetParams = { url: 'www.request.com' };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers);
  })

  test('Should add headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpGetParams = { url: 'www.request.com' };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    });
  })

  test('Should merge headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const field = 'any_data';
    const httpRequest: HttpGetParams = {
      url: 'www.request.com',
      headers: { field }
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    });
  })

  test('Should return the same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        content: 'any_content'
      }
    };
    const httpRequest: HttpGetParams = {
      url: 'www.request.com',
      headers: {
        field: 'any_data'
      }
    };
    const httpResponse = await sut.get(httpRequest);
    expect(httpResponse).toEqual(httpGetClientSpy.response);
  })
})
