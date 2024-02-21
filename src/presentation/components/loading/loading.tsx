import Styles from './loading-styles.module.scss';
import { Spinner } from '../spinner/spinner';

export function Loading() {
  return (
    <div className={Styles.loadingWrap}>
      <div className={Styles.loading}>
        <span>aguarde...</span>
        <Spinner />
      </div>
    </div>
  )
}
