import { faker } from "@faker-js/faker";
import { LoadSurveyList } from "../usecases/load-survey-list";

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.database.mongodbObjectId(),
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean(),
  question: faker.word.words(4)
})

export const mockSurveyList = (): LoadSurveyList.Model[] => {
  return [
    mockSurveyModel(),
    mockSurveyModel(),
    mockSurveyModel()
  ];
}

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyList();
  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return Promise.resolve(this.surveys);
  }
}