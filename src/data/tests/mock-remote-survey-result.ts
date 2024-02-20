import { RemoteLoadSurveyResult } from "../usecases/load-survey-result/remote-load-survey-result";

export const mockRemoteSurveyResult = (): RemoteLoadSurveyResult.Model => ({
  question: 'fake question',
  date: new Date().getTime(),
  answers: [{
    image: 'fake image url',
    answer: 'fake answer',
    count: 2,
    percent: 1,
    isCurrentAccountAnswer: true
  }]
})
