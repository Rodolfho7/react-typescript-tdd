import userEvent, { UserEvent } from "@testing-library/user-event";
import { SignUp } from "./signup";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { ValidationSpy } from "../../tests/mock-validation";
import { faker } from "@faker-js/faker";
import { AddAccountSpy } from "../../tests/mock-add-account";
import { EmailInUseError } from "../../../domain/error/email-in-use-error";
import ApiContext from '../../contexts/api/api-context';
import { AddAccount } from "../../../domain/usecases/add-account";

type SutTypes = {
  validationSpy: ValidationSpy,
  addAccountSpy: AddAccountSpy,
  setCurrentAccountMock: (account: AddAccount.Model) => void,
  user: UserEvent
}

type SutParams = {
  validationError: string | null
}

const makeSut = (params?: SutParams): SutTypes => {
  const user = userEvent.setup();
  const validationSpy = new ValidationSpy();
  const addAccountSpy = new AddAccountSpy();
  const setCurrentAccountMock = jest.fn();

  validationSpy.errorMessage = params?.validationError || null;

  const routes = [
    {
      path: '/',
      element: <h1>inicial page</h1>
    },
    {
      path: '/signup',
      element:
        <SignUp
          validation={validationSpy}
          addAccount={addAccountSpy}
        />
    },
    {
      path: '/login',
      element: <h1>login page</h1>
    }
  ];

  const router = createMemoryRouter(routes, { initialEntries: ['/signup'] });

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  );
  return { validationSpy, addAccountSpy, setCurrentAccountMock, user }
}

const simulateValidSubmit = async (
  user: UserEvent,
  name = faker.word.words(1),
  email = faker.internet.email(),
  password = faker.internet.password(),
  passwordConfirmation = faker.internet.password()
): Promise<void> => {
  const nameInput = screen.getByTestId('name');
  const emailInput = screen.getByTestId('email');
  const passwordInput = screen.getByTestId('password');
  const passwordConfirmationInput = screen.getByTestId('passwordConfirmation');
  await user.type(nameInput, name);
  await user.type(emailInput, email);
  await user.type(passwordInput, password);
  await user.type(passwordConfirmationInput, passwordConfirmation);
  const submitButton = screen.getByText('Criar conta', { selector: 'button' });
  await user.click(submitButton);
}

describe('SignUp component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório';
    makeSut({ validationError });
    expect(screen.getByTestId('error-wrap').childElementCount).toBe(0);
    expect(screen.getByText('Criar conta', { selector: 'button' })).toBeDisabled();
    expect(screen.getByTestId('name-status').title).toBe(validationError);
    expect(screen.getByTestId('name-status').textContent).toBe('X');
    expect(screen.getByTestId('email-status').title).toBe(validationError);
    expect(screen.getByTestId('email-status').textContent).toBe('X');
    expect(screen.getByTestId('password-status').title).toBe(validationError);
    expect(screen.getByTestId('password-status').textContent).toBe('X');
    expect(screen.getByTestId('passwordConfirmation-status').title).toBe(validationError);
    expect(screen.getByTestId('passwordConfirmation-status').textContent).toBe('X');
  })

  test('Should show name error if Validation fails', async () => {
    const { validationSpy, user } = makeSut({ validationError: faker.word.words(3) });
    const nameInput = screen.getByTestId('name');
    await user.type(nameInput, 'fake_name');
    const nameStatus = screen.getByTestId('name-status');
    expect(nameStatus.title).toBe(validationSpy.errorMessage);
  })

  test('Should show email error if Validation fails', async () => {
    const { validationSpy, user } = makeSut({ validationError: faker.word.words(3) });
    const nameInput = screen.getByTestId('email');
    await user.type(nameInput, 'fake_email');
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

  test('Should show passwordConfirmation error if Validation fails', async () => {
    const { validationSpy, user } = makeSut({ validationError: faker.word.words(3) });
    const passwordConfirmationInput = screen.getByTestId('passwordConfirmation');
    await user.type(passwordConfirmationInput, 'fake_passwordConfirmation');
    const passwordConfirmationStatus = screen.getByTestId('passwordConfirmation-status');
    expect(passwordConfirmationStatus.title).toBe(validationSpy.errorMessage);
  })

  test('Should show valid name if Validation succeeds', async () => {
    const { user } = makeSut();
    const nameInput = screen.getByTestId('name');
    await user.type(nameInput, 'any_name');
    const nameStatus = screen.getByTestId('name-status');
    expect(nameStatus.title).toBe('Tudo certo');
  })

  test('Should show valid email if Validation succeeds', async () => {
    const { user } = makeSut();
    const emailInput = screen.getByTestId('email');
    await user.type(emailInput, 'any_email');
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo certo');
  })

  test('Should show valid password if Validation succeeds', async () => {
    const { user } = makeSut();
    const passwordInput = screen.getByTestId('password');
    await user.type(passwordInput, 'any_password');
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo certo');
  })

  test('Should show valid passwordConfirmation if Validation succeeds', async () => {
    const { user } = makeSut();
    const passwordConfirmationInput = screen.getByTestId('passwordConfirmation');
    await user.type(passwordConfirmationInput, 'any_passwordConfirmation');
    const passwordConfirmationStatus = screen.getByTestId('passwordConfirmation-status');
    expect(passwordConfirmationStatus.title).toBe('Tudo certo');
  })

  test('Should enable submit button if form is valid', async () => {
    const { user } = makeSut();
    const nameInput = screen.getByTestId('name');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const passwordConfirmationInput = screen.getByTestId('passwordConfirmation');
    await user.type(nameInput, 'valid_name');
    await user.type(emailInput, 'valid_email');
    await user.type(passwordInput, 'valid_password');
    await user.type(passwordConfirmationInput, 'valid_passwordConfirmation');
    const submitButton = screen.getByText('Criar conta', { selector: 'button' });
    expect(submitButton).toBeEnabled();
  })

  test('Should show spinner on submit', async () => {
    const { user, addAccountSpy } = makeSut();
    jest.spyOn(addAccountSpy, 'add')
      .mockImplementationOnce(() => new Promise((resolve) => setTimeout(() => {
        return resolve({ accessToken: 'randomwordsaccessToken', name: 'any_name' });
      }, 2000)
    ));
    await simulateValidSubmit(user);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  })

  test('Should call addAccount with correct values', async () => {
    const { user, addAccountSpy } = makeSut();
    const name = 'any_name';
    const email = faker.internet.email();
    const password = faker.internet.password();
    const passwordConfirmation = password;

    await simulateValidSubmit(user, name, email, password, passwordConfirmation);
    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation });
  })

  test('Should call addAccount only once', async () => {
    const { user, addAccountSpy } = makeSut();
    const name = 'any_name';
    const email = faker.internet.email();
    const password = faker.internet.password();
    const passwordConfirmation = password;
    const nameInput = screen.getByTestId('name');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const passwordConfirmationInput = screen.getByTestId('passwordConfirmation');
    await user.type(nameInput, name);
    await user.type(emailInput, email);
    await user.type(passwordInput, password);
    await user.type(passwordConfirmationInput, passwordConfirmation);
    const submitButton = screen.getByText('Criar conta', { selector: 'button' });
    await user.click(submitButton);
    user.click(submitButton);
    expect(addAccountSpy.callsCount).toBe(1);
  })

  test('Should not call addAccount if form is invalid', async () => {
    const { user, addAccountSpy } = makeSut({ validationError: faker.word.words(3) });
    const submitButton = screen.getByText('Criar conta', { selector: 'button' });
    await user.click(submitButton);
    expect(addAccountSpy.callsCount).toBe(0);
  })

  test('Should present error if addAccount fails', async () => {
    const { user, addAccountSpy } = makeSut();
    const error = new EmailInUseError();
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);
    await simulateValidSubmit(user);
    const mainError = screen.getByTestId('main-error');
    const errorWrap = screen.getByTestId('error-wrap');
    expect(mainError.textContent).toBe(error.message);
    expect(errorWrap.childElementCount).toBe(1);
  })

  test('Should add addAccount to localStorage in success', async () => {
    const { user, addAccountSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit(user);
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);
  })

  test('Should go to login page', async () => {
    const { user } = makeSut();
    const loginLink = screen.getByText('Voltar para login');
    await user.click(loginLink);
    expect(screen.getByText('login page')).toBeInTheDocument();
  })
})
