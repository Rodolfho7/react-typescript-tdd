import { faker } from "@faker-js/faker";
import { RemoteLoadSurveyList } from "./remote-load-survey-list";
import { HttpGetClientSpy } from "../../tests/mock-http";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { UnexpectedError } from "../../../domain/error/unexpected-error";
import { mockRemoteSurveyList } from "../../tests/mock-remote-survey-list";
import { AccessDeniedError } from "../../../domain/error/access-denied-error";

type SutTypes = {
  sut: RemoteLoadSurveyList,
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
  return { sut, httpGetClientSpy }
}

describe('RemoteLoadSurveyList', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url);
  })

  test('Should throw UnexpectedError if httpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadAll();
    expect(promise).rejects.toThrow(new AccessDeniedError());
  })

  test('Should throw UnexpectedError if httpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.loadAll();
    expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should throw UnexpectedError if httpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadAll();
    expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should return a list of SurveyModels if httpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const responseSurveyList = mockRemoteSurveyList();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: responseSurveyList
    }
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([
      {
        id: responseSurveyList[0].id,
        question: responseSurveyList[0].question,
        date: new Date(responseSurveyList[0].date),
        didAnswer: responseSurveyList[0].didAnswer
      },
      {
        id: responseSurveyList[1].id,
        question: responseSurveyList[1].question,
        date: new Date(responseSurveyList[1].date),
        didAnswer: responseSurveyList[1].didAnswer
      },
      {
        id: responseSurveyList[2].id,
        question: responseSurveyList[2].question,
        date: new Date(responseSurveyList[2].date),
        didAnswer: responseSurveyList[2].didAnswer
      },
    ]);
  })

  test('Should return an empty list if httpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([])
  })
});
