import { render, screen } from "@testing-library/react";
import ApiContext from "../../contexts/api/api-context";
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Header } from "./header";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { AccountModel } from "../../../domain/models/account-model";
import { mockAccountModel } from "../../../domain/tests/mock-account";

type SutTypes = {
  user: UserEvent,
  setCurrentAccountMock: typeof jest.fn
}

const makeSut = (account: AccountModel = mockAccountModel()): SutTypes => {
  const user = userEvent.setup();
  const setCurrentAccountMock = jest.fn();
  const getCurrentAccountMock = (): AccountModel => account;
  const routes = [
    {
      path: '/',
      element: <Header />
    },
    {
      path: '/login',
      element:
        <h1>login page mock</h1>
    }
  ];

  const router = createMemoryRouter(routes, { initialEntries: ['/'] });
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: getCurrentAccountMock
    }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  );

  return { user, setCurrentAccountMock };
}

describe('Header component', () => {
  test('Should call setCurrentAccount with null', async () => {
    const { user, setCurrentAccountMock } = makeSut();

    const logoutButton = screen.getByText('Sair');
    await user.click(logoutButton);

    const loginText = screen.getByText('login page mock');
    expect(loginText).toBeInTheDocument();
    expect(setCurrentAccountMock).toHaveBeenCalled();
  })

  test('Should render username correctly', () => {
    const account: AccountModel = {
      name: 'mocked name',
      accessToken: 'fake_access_token'
    }
    makeSut(account);
    expect(screen.getByTestId('username').textContent).toBe(account.name);
  })
})
