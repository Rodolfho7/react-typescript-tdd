import Styles from './item-styles.module.scss';
import { Icon } from '../../../../components/icon/icon';
import { LoadSurveyList } from '../../../../../domain/usecases/load-survey-list';

type SurveyItemProps = {
  survey: LoadSurveyList.Model
}

export function SurveyItem({ survey }: SurveyItemProps) {
  const iconName = survey.didAnswer ? 'thumbUp' : 'thumbDown';
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} />
        <time>
          <span data-testid='day' className={Styles.day}>
            {survey.date.getDate().toString().padStart(2, '0')}
          </span>
          <span data-testid='month' className={Styles.month}>
            {survey.date.toLocaleString('pt-BR', { month: 'short' })}
          </span>
          <span data-testid='year' className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer>Ver resultados</footer>
    </li>
  )
}
