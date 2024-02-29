import { Calendar } from '../../components/calendar/calendar';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Loading } from '../../components/loading/loading';
import Styles from './survey-result-styles.module.scss';

export function SurveyResult() {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <hgroup>
          <Calendar date={new Date()} />
          <h2>Qual é seu framework web favorito?</h2>
        </hgroup>
        <ul>
          <li>
            <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="" />
            <span className={Styles.answer}>Angular</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li className={Styles.active}>
            <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="" />
            <span className={Styles.answer}>Angular</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li>
            <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="" />
            <span className={Styles.answer}>Angular</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li>
            <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="" />
            <span className={Styles.answer}>Angular</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </ul>
        <button>voltar</button>
        { false && <Loading /> }
      </div>
      <Footer />
    </div>
  )
}
