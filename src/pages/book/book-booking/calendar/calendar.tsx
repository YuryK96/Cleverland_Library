/* eslint-disable */
import { FC, useEffect, useState } from 'react';
import s from './calendar.module.scss';
import arrow_drop_down from './../../../../assets/images/calendar/arrow_drop_down_24px.svg';
import arrow_up from './../../../../assets/images/calendar/icon-arrow-up.svg';
import arrow_down from './../../../../assets/images/calendar/icon-arrow-down.svg';


export const Calendar:FC<CalendarType> = ({selectedDay,handleSetSelectedDay,handleClearSelectedDay}) => {
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    const today = new Date();
    const [date, setDate] = useState(today);
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());

    const [isCurrentTime, setIsCurrentTime] = useState(true);
    const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
    const [lastDay, setLastDay] = useState(getLastDayOfMonth(date));
    const [isListOpen, setIsListOpen] = useState(false);
    const [daysInMonth, setDaysInMonth] = useState(getAllDaysInMonth(date));
    const [daysInPreviousMonth, setDaysInPreviousMonth] = useState(getAllDaysInPreviousMonth(date));


    useEffect(() => {
        if (new Date().getMonth() !== month || new Date().getFullYear() !== year) {
            setIsCurrentTime(true);
        } else (setIsCurrentTime(false));

    }, [month, year]);

    useEffect(() => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));
        setLastDay(getLastDayOfMonth(date));
        setDaysInMonth(getAllDaysInMonth(date));
        setDaysInPreviousMonth(getAllDaysInPreviousMonth(date));
    }, [date]);


    const toggleIsOpenList = () => {
        setIsListOpen(!isListOpen);
    };

    function getStartDayOfMonth(date: Date) {
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

        return startDate === 0 ? 7 : startDate;
    }

    function getLastDayOfMonth(date: Date) {
        const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

        return lastDate === 0 ? 7 : lastDate;
    }

    function getAllDaysInMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    function getAllDaysInPreviousMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    }

    function isLeapYear(year: number) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    const days = isLeapYear(year) ? DAYS_LEAP : DAYS;


    return <div className={s.calendar}>
        <div className={s.header}>

            <div className={s.month_year}>
                <span> {MONTHS[month]} {year}</span>
                <div role="presentation" onClick={toggleIsOpenList} className={s.list}><img
                    src={arrow_drop_down} alt="arrow" /></div>
            </div>
            <div className={`${s.month_list} ${isListOpen ? s.open_month_list : ''}`}>
                <ul>
                    {MONTHS.map((month, index) => <li key={index} role="presentation"
                                                      onClick={() => {
                                                          setDate(new Date(year, index, day));
                                                          setIsListOpen(false)
                                                      }

                                                      }>{month}</li>)}</ul>
            </div>
            <div className={s.buttons_wrapper}>
                <div className={s.button} role="presentation"
                     onClick={() => {
                         setDate(new Date(year, month - 1, day));
                         handleClearSelectedDay();
                     }}><img src={arrow_up}
                             alt="arrow" />
                </div>
                <div role="presentation" className={s.button}
                     onClick={() => {
                         setDate(new Date(year, month + 1, day));
                         handleClearSelectedDay();
                     }}><img src={arrow_down}
                             alt="arrow" />
                </div>
            </div>
        </div>
        <div className={s.body}>
            {DAYS_OF_THE_WEEK.map((d) => (
                <div className={s.dayOfTheWeek} key={d}>
                    {d}
                </div>
            ))}
            {Array(days[month] + (startDay - 1) + (6 - (lastDay - 1)))
                .fill(null)
                .map((item, index) => {

                    const d = index - (startDay - 2);
                    let isActive = false;
                    let isMondayAfterWeekends = false;


                    if (!isCurrentTime) {

                        if (d === today.getDate() || d === today.getDate() + 1) {

                            if (new Date(year, month, day).getDay() === 6 || new Date(year, month, day).getDay() === 0) {
                                isActive = false;
                            } else {
                                isActive = true;
                            }
                        }

                        if (d === today.getDate() + 3 && new Date(year, month, day).getDay() === 5 || d === today.getDate() + 2 && new Date(year, month, day).getDay() === 6 || d === today.getDate() + 1 && new Date(year, month, day).getDay() === 0) {
                            isMondayAfterWeekends = true;
                            isActive = true;
                        }
                    }


                    let isWeekend = false;
                    if (new Date(year, month, d).getDay() === 0 || new Date(year, month, d).getDay() === 6) {
                        if (new Date(year, month, d).getMonth() === month)
                            isWeekend = true;
                        isActive = false;

                    }


                    return (
                        <button disabled={!isActive} role="presentation"
                                className={`${s.day} ${d === today.getDate() && !isCurrentTime && s.isToday} ${d === selectedDay && s.isSelected} ${isActive && s.isNext2Days} ${isMondayAfterWeekends && s.isNext2Days} ${isWeekend && s.isWeekend}`}
                                key={index}

                                onClick={() => handleSetSelectedDay(d)}
                        >
                            {d > daysInMonth ? d - daysInMonth : d > 0 ? d : (daysInPreviousMonth - startDay + 2 + index)}
                        </button>
                    );
                })}
        </div>
    </div>;
};


type CalendarType = {
    selectedDay: null | number
    handleClearSelectedDay: ()=> void
    handleSetSelectedDay: (day:number)=> void
}
