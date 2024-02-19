import { faker } from "@faker-js/faker";
import { RemoteLoadSurveyList } from "../usecases/load-survey-list/remote-load-survey-list";

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.database.mongodbObjectId(),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.datatype.boolean(),
  question: faker.word.words(4)
})

export const mockRemoteSurveyList = (): RemoteLoadSurveyList.Model[] => {
  return [
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel()
  ];
}
