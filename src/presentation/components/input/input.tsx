import { useContext } from 'react';
import Context from '../../contexts/form/form-context';
import Styles from './input.module.scss';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function Input(props: InputProps) {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name as string}Error`];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} onChange={handleChange} />
      <span data-testid={`${props.name}-status`} title={error || 'Tudo certo'} className={Styles.status}>
        {error ? 'X' : ''}
      </span>
    </div>
  )
};
