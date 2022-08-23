import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { getDayName } from 'utils/getDayName';
import { getMonthNames } from 'utils/getMonthNames';
import { getDays } from 'utils/getDays';
import { addZero } from 'utils/addZero';
import { ReactComponent as ArrowDown } from 'assets/icons/selectDownArrow.svg';
import { ReactComponent as ArrowUp } from 'assets/icons/selectUpArrow.svg';
import styles from './Calendar.module.scss';

const cx = classNames.bind(styles);

export interface CalendarProps {
  onClick: () => void;
  subsCount?: number;
}

interface CurrentDate {
  currentMonth: number;
  selectedDate: string;
  listOfMonth: string[];
}

const Calendar = ({ onClick, subsCount }: CalendarProps) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<CurrentDate>({
    currentMonth: date.getMonth(),
    selectedDate: new Date().toLocaleDateString(),
    listOfMonth: [],
  });
  const { currentMonth, selectedDate, listOfMonth } = currentDate;

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const isCloseHandler = () => setIsOpen(false);

  const isOpenHandler = () => setIsOpen(true);

  const dateButtonHandler = (day: number, month: number, year: number) => {
    onClick();
    setCurrentDate({...currentDate, selectedDate: new Date(year, month, day).toLocaleDateString()});
  };

  const arrOfDays = (days: number) => {
    const result = [];
    const currentLocalMonth = date.getMonth();
    const currentLocalDay = date.getDate();

    if (currentLocalMonth === currentMonth) {
      for(let i = currentLocalDay; i <= days; i++) {
        result.push({number: i, day: getDayName(currentYear, currentMonth, i)})
      }
      return result;
    }
    for(let i = 1; i <= days; i++) {
      result.push({number: i, day: getDayName(currentYear, currentMonth, i)})
    }
    return result;
  };

  const selectMonthHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    isCloseHandler();
    setCurrentDate({...currentDate, currentMonth: months.indexOf(e.target.value)})
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
              value={months[currentMonth]}
              onChange={selectMonthHandler}
              data-testid={months[currentMonth]}
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
            {arrOfDays(getDays(currentMonth, currentYear)).map(({day, number}) => (
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
