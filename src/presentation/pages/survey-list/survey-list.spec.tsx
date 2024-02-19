import { render, screen, waitFor } from "@testing-library/react";
import { SurveyList } from "./survey-list";
import { LoadSurveyListSpy } from "../../../domain/tests/mock-survey-list";
import { UnexpectedError } from "../../../domain/error/unexpected-error";
import UserEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import ApiContext from '../../contexts/api/api-context';
import { AccessDeniedError } from "../../../domain/error/access-denied-error";

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy,
  setCurrentAccountMock: typeof jest.fn
}

function makeSut(loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes {
  const setCurrentAccountMock = jest.fn();
  const routes = [
    {
      path: '/',
      element: <SurveyList loadSurveyList={loadSurveyListSpy} />
    },
    {
      path: '/login',
      element: <h1>login page mock</h1>
    }
  ];

  const router = createMemoryRouter(routes, { initialEntries: ['/'] });
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  );
  return { loadSurveyListSpy, setCurrentAccountMock }
}

describe('SurveyList component', () => {
  test('Should render 4 empty itens', async () => {
    makeSut();
    const surveyListItems = screen.getByRole('list');
    expect(surveyListItems.querySelectorAll('li:empty').length).toBe(4);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    await waitFor(() => {
      surveyListItems
    });
  })

  test('Should call LoadSurveyList', async () => {
    await waitFor(() => {
      const { loadSurveyListSpy } = makeSut();
      expect(loadSurveyListSpy.callsCount).toBe(1);
    });
  })

  test('Should render surveyItens on success', async () => {
    await waitFor(() => {
      makeSut();
    });
    const surveyListItems = screen.getByRole('list');
    expect(surveyListItems.querySelectorAll('li.surveyItemWrap').length).toBe(3);
  })

  test('Should render error on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error);
    makeSut(loadSurveyListSpy);
    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument();
      expect(screen.getByTestId('error')).toHaveTextContent(error.message);
    });
  })

  test('Should logout on accessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError());
    const { setCurrentAccountMock } = makeSut(loadSurveyListSpy);
    await waitFor(() => {
      expect(screen.getByText('login page mock')).toBeInTheDocument();
      expect(setCurrentAccountMock).toHaveBeenCalled();
    });

  })

  test('Should call LoadsurveyList on reload', async () => {
    const user = UserEvent.setup();
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError());
    makeSut(loadSurveyListSpy);
    await waitFor(async () => {
      const reloadButton = screen.getByTestId('reload');
      await user.click(reloadButton);
    })
    expect(loadSurveyListSpy.callsCount).toBe(1);
  })
})
