import Styles from './calendar-styles.module.scss';

type CalendarProps = {
  date: Date
}

export function Calendar({ date }: CalendarProps) {
  return (
    <time className={Styles.calendarWrap}>
      <span data-testid='day' className={Styles.day}>
        {date.getDate().toString().padStart(2, '0')}
      </span>
      <span data-testid='month' className={Styles.month}>
        {date.toLocaleString('pt-BR', { month: 'short' })}
      </span>
      <span data-testid='year' className={Styles.year}>
        {date.getFullYear()}
      </span>
    </time>
  )
}
