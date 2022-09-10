import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { getMonthNames } from 'utils/getMonthNames';
import { getDays } from 'utils/getDays';
import { addZero } from 'utils/addZero';
import { arrOfDays } from 'utils/arrOfDays';
import { MONTHS } from 'constants/months';
import styles from './Calendar.module.scss';
import { ReactComponent as ArrowDown } from 'assets/icons/selectDownArrow.svg';
import { ReactComponent as ArrowUp } from 'assets/icons/selectUpArrow.svg';

const cx = classNames.bind(styles);

export interface CalendarProps {
  onClick: (date: string) => void;
  selectedDateHandler: (date: string) => void;
  selectedMothHandler: (date: string) => void;
  subsCount?: number;
}

interface CurrentDate {
  currentMonth: number;
  selectedDate: string;
  listOfMonth: string[];
}

const Calendar = ({ onClick, selectedDateHandler, selectedMothHandler, subsCount }: CalendarProps) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<CurrentDate>({
    currentMonth: date.getMonth(),
    selectedDate: new Date().toLocaleDateString(),
    listOfMonth: [],
  });
  const { currentMonth, selectedDate, listOfMonth } = currentDate;

  const isCloseHandler = () => setIsOpen(false);

  const isOpenHandler = () => setIsOpen(true);

  const dateButtonHandler = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day).toLocaleDateString();
    onClick(date);
    selectedDateHandler(date);
    setCurrentDate({...currentDate, selectedDate: date});
  };

  const selectMonthHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    isCloseHandler();
    selectedMothHandler(e.target.value);
    setCurrentDate({...currentDate, currentMonth: MONTHS.indexOf(e.target.value)})
  };

  useEffect(() => {
    setCurrentDate({...currentDate, listOfMonth: getMonthNames(currentMonth, currentYear)});
  }, []);

  return (
    <div className={cx('calendar')}>
      <span className={cx('calendar__title')}>Subs<br/>Schedule</span>
        <div className={cx('calendar__select_wrapper')} >
          <span className={cx('calendar__select_info')}>
            {subsCount} subscriptions for { selectedDate === date.toLocaleDateString() ? 'today' : selectedDate }
          </span>
            <select
              className={cx('calendar__select')}
              onMouseDown={isOpenHandler}
              value={MONTHS[currentMonth]}
              onChange={selectMonthHandler}
              data-testid={MONTHS[currentMonth]}
            >
              {listOfMonth.map((month) => (
                <option value={month} key={month}>{month}</option>
              ))}
            </select>
            <span className={cx('arrow')}>
              {isOpen ? <ArrowUp/> : <ArrowDown/>}
            </span>
        </div>
        <div className={cx('calendar__list')}>
          {arrOfDays(getDays(currentMonth, currentYear), currentMonth).map(({day, number}) => (
            <button
              onClick={() => dateButtonHandler(number, currentMonth, currentYear)}
              className={
                cx('calendar__item', { active: selectedDate === new Date(currentYear, currentMonth, number).toLocaleDateString() })}
                key={number}>
                  <span className={cx('calendar__number')}>{addZero(number)}</span>
                  <span className={cx('calendar__day')}>{day}</span>
            </button>
          ))}
        </div>
    </div>
  );
};

Calendar.defaultProps = {
  subsCount: 0,
}

export default Calendar;
