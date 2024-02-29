import Styles from './item-styles.module.scss';
import { Icon } from '../../../../components/icon/icon';
import { LoadSurveyList } from '../../../../../domain/usecases/load-survey-list';
import { Calendar } from '../../../../components/calendar/calendar';

type SurveyItemProps = {
  survey: LoadSurveyList.Model
}

export function SurveyItem({ survey }: SurveyItemProps) {
  const iconName = survey.didAnswer ? 'thumbUp' : 'thumbDown';
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} />
        <Calendar date={survey.date} />
        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer>Ver resultados</footer>
    </li>
  )
}
