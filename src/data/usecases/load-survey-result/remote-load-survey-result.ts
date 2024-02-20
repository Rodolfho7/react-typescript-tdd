import { HttpGetClient } from "../../protocols/http/http-get-client";

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  load(): Promise<void> {
    this.httpGetClient.get({ url: this.url });
    return Promise.resolve();
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string,
    date: Date,
    answers: [{
      image?: string,
      answer: string,
      count: number,
      percent: number
    }]
  }
}
