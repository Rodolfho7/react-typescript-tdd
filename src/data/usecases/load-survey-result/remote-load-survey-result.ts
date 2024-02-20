import { AccessDeniedError } from "../../../domain/error/access-denied-error";
import { UnexpectedError } from "../../../domain/error/unexpected-error";
import { LoadSurveyResult } from "../../../domain/usecases/load-survey-result";
import { HttpGetClient } from "../../protocols/http/http-get-client";
import { HttpStatusCode } from "../../protocols/http/http-response";

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) { }

  async load(): Promise<LoadSurveyResult.Model | null> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body ? Promise.resolve({ ...httpResponse.body, date: new Date(httpResponse.body.date) }) : null;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string,
    date: string,
    answers: [{
      image?: string,
      answer: string,
      count: number,
      percent: number
    }]
  }
}
