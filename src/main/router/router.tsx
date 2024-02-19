import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { makeLogin } from '../factories/pages/login/login-factory';
import { makeSignUp } from '../factories/pages/signup/signup-factory';
import ApiContext from '../../presentation/contexts/api/api-context';
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter';
import { PrivateRoute } from '../../presentation/components/private-route/private-route';
import { makeSurveyList } from '../factories/pages/survey-list/survey-list-factory';

const routes = createBrowserRouter([
  {
    path: '/',
    element:
      <PrivateRoute>
        {makeSurveyList()}
      </PrivateRoute>
  },
  {
    path: '/login',
    element: makeLogin()
  },
  {
    path: '/signup',
    element: makeSignUp()
  }
]);

export function Router() {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <RouterProvider router={routes} />
    </ApiContext.Provider>
  )
}
