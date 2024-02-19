import { Footer } from '../../components/footer/footer';
import { FormStatus } from '../../components/form-status/form-status';
import { Input } from '../../components/input/input';
import { LoginHeader } from '../../components/login-header/login-header';
import Styles from './signup-styles.module.scss';
import Context from '../../contexts/form/form-context';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Validation } from '../../protocols/validation';
import { AddAccount } from '../../../domain/usecases/add-account';
import ApiContext, { ApiContextProps } from '../../contexts/api/api-context';

type SignUpProps = {
  validation: Validation,
  addAccount: AddAccount,
}

type StateProps = {
  isLoading: boolean,
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  nameError: string | null,
  emailError: string | null,
  passwordError: string | null,
  passwordConfirmationError: string | null,
  error: string
}

export function SignUp({ validation, addAccount }: SignUpProps) {
  const { setCurrentAccount } = useContext(ApiContext) as ApiContextProps;
  const navigate = useNavigate();
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    error: ''
  });

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state;
    const formData = { name, email, password, passwordConfirmation };
    const nameError = validation.validate('name', formData);
    setState((oldValues) => ({ ...oldValues, nameError }));
  }, [state.name])

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state;
    const formData = { name, email, password, passwordConfirmation };
    const emailError = validation.validate('email', formData);
    setState((oldValues) => ({ ...oldValues, emailError }));
  }, [state.email])

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state;
    const formData = { name, email, password, passwordConfirmation };
    const passwordError = validation.validate('password', formData);
    setState((oldValues) => ({ ...oldValues, passwordError }));
  }, [state.password])

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state;
    const formData = { name, email, password, passwordConfirmation };
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData);
    setState((oldValues) => ({ ...oldValues, passwordConfirmationError }));
  }, [state.passwordConfirmation])

  const disabledSubmitButton = !!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError || state.isLoading;

  const handleSubmit = async (): Promise<void> => {
    try {
      setState((oldState) => ({ ...oldState, isLoading: true }));
      if (disabledSubmitButton) {
        return;
      }
      const { name, email, password, passwordConfirmation } = state;
      const accountModel = await addAccount.add({ name, email, password, passwordConfirmation });
      setCurrentAccount(accountModel);
      setState((oldState) => ({ ...oldState, isLoading: false }));
      navigate('/', { replace: true });
    } catch(error: any) {
      setState((oldState) => ({...oldState, isLoading: false, error: error.message}));
    }
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Criar conta</h2>
          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu email' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Digite sua senha novamente' />
          <button className={Styles.submit} disabled={disabledSubmitButton} type="button" onClick={handleSubmit}>Criar conta</button>
          <Link to='/login' replace className={Styles.link}>Voltar para login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}
