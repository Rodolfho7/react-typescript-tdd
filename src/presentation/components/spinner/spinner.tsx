import Styles from './spinner.module.scss';

export function Spinner() {
  return (
    <div data-testid='spinner' className={Styles.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
