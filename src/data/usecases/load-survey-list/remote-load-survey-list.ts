import { AccessDeniedError } from "../../../domain/error/access-denied-error";
import { UnexpectedError } from "../../../domain/error/unexpected-error";
import { LoadSurveyList } from "../../../domain/usecases/load-survey-list";
import { HttpGetClient } from "../../protocols/http/http-get-client";
import { HttpStatusCode } from "../../protocols/http/http-response";

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const response = await this.httpGetClient.get({ url: this.url });
    const remoteSurveys = response.body;
    switch(response.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys?.map((survey) => ({ ...survey, date: new Date(survey.date) })) as LoadSurveyList.Model[];
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string,
    question: string,
    date: string,
    didAnswer: boolean
  }
}
