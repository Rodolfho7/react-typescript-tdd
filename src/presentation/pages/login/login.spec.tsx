import { Login } from './login';
import { render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { ValidationSpy } from '../../tests/mock-validation';
import { faker } from '@faker-js/faker';
import { AuthenticationSpy } from '../../tests/mock-authentication';
import { InvalidCredentialsError } from '../../../domain/error/invalid-credentials-error';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ApiContext from '../../contexts/api/api-context';
import { Authentication } from '../../../domain/usecases/authentication';

type SutTypes = {
  validationSpy: ValidationSpy,
  authenticationSpy: AuthenticationSpy,
  setCurrentAccountMock: (account: Authentication.Model) => void,
  user: UserEvent
}

type SutParams = {
  validationError: string | null
}

const makeSut = (params?: SutParams): SutTypes => {
  const user = userEvent.setup();
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  const setCurrentAccountMock = jest.fn();
  validationSpy.errorMessage = params?.validationError as string | null;

  const routes = [
    {
      path: '/',
      element: <h1>inicial page</h1>
    },
    {
      path: '/login',
      element:
        <Login
          validation={validationSpy}
          authentication={authenticationSpy}
        />
    },
    {
      path: '/signup',
      element: <h1>sign up page</h1>
    }
  ];

  const router = createMemoryRouter(routes, { initialEntries: ['/login'] });

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  );
  return { validationSpy, user, authenticationSpy, setCurrentAccountMock }
}

const simulateValidSubmit = async (user: UserEvent, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  const emailInput = screen.getByTestId('email');
  const passwordInput = screen.getByTestId('password');
  await user.type(emailInput, email);
  await user.type(passwordInput, password);
  const submitButton = screen.getByText('Entrar');
  await user.click(submitButton);
}

describe('Login Component', () => {
  beforeEach(() => window.localStorage.clear());

  test('Should start with initial state', () => {
    const { validationSpy } = makeSut({ validationError: faker.word.words(3) });
    expect(screen.getByTestId('error-wrap').childElementCount).toBe(0);
    expect(screen.getByText('Entrar')).toBeDisabled();
    expect(screen.getByTestId('email-status').title).toBe(validationSpy.errorMessage);
    expect(screen.getByTestId('email-status').textContent).toBe('X');
    expect(screen.getByTestId('password-status').title).toBe(validationSpy.errorMessage);
    expect(screen.getByTestId('password-status').textContent).toBe('X');
  })

  test('Should call validation with correct email value', async () => {
    const { validationSpy, user } = makeSut();
    const emailInput = screen.getByTestId('email');
    await user.type(emailInput, 'fake_email');
    expect(validationSpy.fieldName).toBe('email');
  })

  test('Should call validation with correct password value', async () => {
    const { validationSpy, user } = makeSut();
    const passwordInput = screen.getByTestId('password');
    await user.type(passwordInput, 'fake_password');
    expect(validationSpy.fieldName).toBe('password');
  })

  test('Should show email error if Validation fails', async () => {
    const { validationSpy, user } = makeSut({ validationError: faker.word.words(3) });
    const emailInput = screen.getByTestId('email');
    await user.type(emailInput, 'fake_email');
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
  })

  test('Should show password error if Validation fails', async () => {
    const { validationSpy, user } = makeSut({ validationError: faker.word.words(3) });
    const passwordInput = screen.getByTestId('password');
    await user.type(passwordInput, 'fake_password');
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
  })

  test('Should show valid state if Validation succeeds', async () => {
    const { user } = makeSut();
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    await user.type(emailInput, 'fake_email');
    await user.type(passwordInput, 'fake_password');
    const emailStatus = screen.getByTestId('email-status');
    const passwordStatus = screen.getByTestId('password-status');
    expect(emailStatus.title).toBe('Tudo certo');
    expect(passwordStatus.title).toBe('Tudo certo');
  })

  test('Should enable submit button if form is valid', async () => {
    const { user } = makeSut();
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    await user.type(emailInput, 'valid_email');
    await user.type(passwordInput, 'valid_password');
    const submitButton = screen.getByText('Entrar');
    expect(submitButton).toBeEnabled();
  })

  test('Should show spinner on submit', async () => {
    const { user, authenticationSpy } = makeSut();
    jest.spyOn(authenticationSpy, 'auth')
      .mockImplementationOnce(() => new Promise((resolve) => setTimeout(() => {
        return resolve({ accessToken: 'randomwordsaccessToken', name: 'any_name' });
      }, 2000)
    ));
    await simulateValidSubmit(user);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  })

  test('Should call Authentication with correct values', async () => {
    const { user, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(user, email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  })

  test('Should call authentication only once', async () => {
    const { user, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password()
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    await user.type(emailInput, email);
    await user.type(passwordInput, password);
    const submitButton = screen.getByText('Entrar');
    await user.click(submitButton);
    await user.click(submitButton);
    expect(authenticationSpy.callsCount).toBe(1);
  })

  test('Should not call authentication if form is invalid', async () => {
    const { user, authenticationSpy } = makeSut({ validationError: faker.word.words(3) });
    const emailInput = screen.getByTestId('email');
    await user.type(emailInput, faker.internet.email());
    const submitButton = screen.getByText('Entrar');
    await user.click(submitButton);
    expect(authenticationSpy.callsCount).toBe(0);
  })

  test('Should present error if Authentication fails', async () => {
    const { user, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValue(error);
    await simulateValidSubmit(user);
    const mainError = screen.getByTestId('main-error');
    const errorWrap = screen.getByTestId('error-wrap');
    expect(mainError.textContent).toBe(error.message);
    expect(errorWrap.childElementCount).toBe(1);
  })

  test('Should add accessToken to localStorage in success', async () => {
    const { user, authenticationSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit(user);
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account);
  })

  test('Should go to signup page', async () => {
    const { user } = makeSut();
    const signupLink = screen.getByTestId('signup');
    await user.click(signupLink);
    expect(screen.getByText('sign up page')).toBeInTheDocument();
  })
})
