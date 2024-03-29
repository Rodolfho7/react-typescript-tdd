export interface LoadSurveyResult {
  load(): Promise<LoadSurveyResult.Model | null>;
}

export namespace LoadSurveyResult {
  export type Model = {
    question: string,
    date: Date,
    answers: [{
      image?: string,
      answer: string,
      count: number,
      percent: number,
      isCurrentAccountAnswer: boolean
    }]
  }
}
