import { faker } from "@faker-js/faker";
import { RemoteLoadSurveyResult } from "./remote-load-survey-result";
import { HttpGetClientSpy } from "../../tests/mock-http";

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyResult.Model>();
    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  })
})
