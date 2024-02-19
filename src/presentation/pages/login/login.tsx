import { useContext, useEffect, useState } from 'react';
import { Footer } from '../../components/footer/footer';
import { FormStatus } from '../../components/form-status/form-status';
import { Input } from '../../components/input/input';
import { LoginHeader } from '../../components/login-header/login-header';
import Styles from './login-styles.module.scss';
import Context from '../../contexts/form/form-context';
import { Validation } from '../../protocols/validation';
import { Authentication } from '../../../domain/usecases/authentication';
import { Link, useNavigate } from 'react-router-dom';
import ApiContext, { ApiContextProps } from '../../contexts/api/api-context';

type LoginProps = {
  validation: Validation,
  authentication: Authentication
}

type StateProps = {
  isLoading: boolean,
  email: string,
  password: string,
  emailError: string | null,
  passwordError: string | null,
  error: string
}

export function Login({ validation, authentication }: LoginProps) {
  const { setCurrentAccount } = useContext(ApiContext) as ApiContextProps;
  const navigate = useNavigate();
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    error: ''
  });

  useEffect(() => {
    const { email, password } = state;
    const formData = { email, password };
    const emailError = validation.validate('email', formData);
    setState((oldState) => ({ ...oldState, emailError }));
  }, [state.email])

  useEffect(() => {
    const { email, password } = state;
    const formData = { email, password };
    const passwordError = validation.validate('password', formData);
    setState((oldState) => ({ ...oldState, passwordError }));
  }, [state.password])

  const disabledSubmitButton = !!state.emailError || !!state.passwordError || state.isLoading;

  const handleSubmit = async (): Promise<void> => {
    setState((oldState) => ({ ...oldState, isLoading: true }));
    if (disabledSubmitButton) {
      return;
    }
    try {
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      });
      setCurrentAccount(account);
      setState((oldState) => ({ ...oldState, isLoading: false }));
      navigate('/', { replace: true });
    } catch(e: any) {
      setState((oldState) => ({ ...oldState, isLoading: false, error: e.message }))
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu email' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <button className={Styles.submit} disabled={disabledSubmitButton} type="button" onClick={handleSubmit}>Entrar</button>
          <Link to='/signup' replace data-testid='signup' className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}
