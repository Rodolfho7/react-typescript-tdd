import { useEffect, useState } from 'react';
import { LoadSurveyList } from '../../../domain/usecases/load-survey-list';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import Styles from './survey-list-styles.module.scss';
import { ListItem } from './components/list/list';
import { Error } from './components/error/error';
import { useErrorHandler } from '../../hooks/use-error-handler';

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

export function SurveyList({ loadSurveyList }: SurveyListProps) {
  const handleError = useErrorHandler(
    (error: Error) => setState((oldState) => ({ ...oldState, error: error?.message }))
  );

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: ''
  });

  useEffect(() => {
    loadSurvey();
  }, []);

  const loadSurvey = () => {
    loadSurveyList.loadAll()
    .then((surveys) => setState((oldState) => ({ ...oldState, surveys })))
    .catch(handleError);
  }

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error
          ? <Error error={state.error} reload={loadSurvey} />
          : <ListItem surveys={state.surveys} />
        }
      </div>
      <Footer />
    </div>
  )
}
