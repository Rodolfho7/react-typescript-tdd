import { faker } from "@faker-js/faker";
import { RemoteLoadSurveyResult } from "./remote-load-survey-result";
import { HttpGetClientSpy } from "../../tests/mock-http";
import { AccessDeniedError } from "../../../domain/error/access-denied-error";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { UnexpectedError } from "../../../domain/error/unexpected-error";
import { mockRemoteSurveyResult } from "../../tests/mock-remote-survey-result";

type SutTypes = {
  sut: RemoteLoadSurveyResult,
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);

  return { sut, httpGetClientSpy }
}

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  })

  test('Should throw AccessDeniedError if httpGetClient returns 403', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    };
    const promise = sut.load();
    expect(promise).rejects.toThrow(new AccessDeniedError());
  })

  test('Should throw UnexpectedError if httpGetClient returns 404', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };
    const promise = sut.load();
    expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should throw UnexpectedError if httpGetClient returns 500', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };
    const promise = sut.load();
    expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should return a SurveyResult on 200', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const survey = mockRemoteSurveyResult();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: survey
    }
    const result = await sut.load();
    expect(result).toEqual({
      ...survey,
      date: new Date(survey.date)
    });
  })
})
