import { LoadSurveyList } from "../../../../../domain/usecases/load-survey-list";
import { SurveyItemEmpty } from "../item-empty/item-empty";
import { SurveyItem } from "../item/item";
import Styles from './list-styles.module.scss';

type ListItemProps = {
  surveys: LoadSurveyList.Model[]
}

export function ListItem({ surveys }: ListItemProps) {
  return (
    <ul data-testid='survey-list' className={Styles.listItemWrap}>
      {surveys.length > 0
        ? surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}
