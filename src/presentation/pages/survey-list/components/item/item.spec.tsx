import { render, screen } from "@testing-library/react";
import { SurveyItem } from "./item";
import { mockSurveyModel } from "../../../../../domain/tests/mock-survey-list";

describe('SurveyItem component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel();
    survey.date = new Date('2024-01-02T00:00:00');
    render(<SurveyItem survey={survey} />);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('02');
    expect(screen.getByTestId('month')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2024');
  })
})
