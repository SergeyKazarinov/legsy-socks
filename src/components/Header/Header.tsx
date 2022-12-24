import { FC } from "react";
import s from './Header.module.scss';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IHeaderProps {
  onChange: (update: [Date, Date]) => void;
  startDate: Date;
  endDate: Date;
}

export const Header: FC<IHeaderProps> = ({onChange, startDate, endDate}) => {
  return(
    <header className={s.header}>
      <h1 className={s.header__title}>Сводка по продавцу ИП Князев Александр Михайлович</h1>
      <div className={s.header__calendarContainer}>
        <label htmlFor='date' className={s.header__label}>Период &#8744;</label>
        <ReactDatePicker
          id='date'
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          isClearable={true}
        />
      </div>
    </header>
  )
}