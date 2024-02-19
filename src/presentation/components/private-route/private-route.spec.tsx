import { render } from "@testing-library/react";
import { PrivateRoute } from "./private-route";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import ApiContext from "../../contexts/api/api-context";
import { mockAccountModel } from '../../../domain/tests/mock-account';
import { AccountModel } from "../../../domain/models/account-model";

const makeSut = (account: AccountModel | null = mockAccountModel()) => {

  const routes = [
    {
      path: '/',
      element:
        <PrivateRoute>
          <h1>Home</h1>
        </PrivateRoute>
    },
    {
      path: '/login',
      element:
        <h1>login page</h1>
    }
  ];

  const router = createMemoryRouter(routes, { initialEntries: ['/'] });

  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account, setCurrentAccount: () => {} }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  );

  return { router };
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    localStorage.clear();
    const { router } = makeSut(null);
    expect(router.state.location.pathname).toBe('/login');
  })

  test('Should open the page if token exists', () => {
    localStorage.clear();
    const { router } = makeSut();
    expect(router.state.location.pathname).toBe('/');
  })
})
