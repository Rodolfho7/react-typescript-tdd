import { useContext } from 'react';
import { Spinner } from '../spinner/spinner';
import Styles from './form-status.module.scss';
import Context from '../../contexts/form/form-context';

export function FormStatus() {
  const { state } = useContext(Context)

  return (
    <div data-testid='error-wrap' className={Styles.errorWrap}>
      {state.isLoading && <Spinner />}
      {state.error && <span className={Styles.error} data-testid='main-error'>{state.error}</span>}
    </div>
  )
};
