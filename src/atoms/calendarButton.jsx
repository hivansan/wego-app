import React from 'react';
import { google as add2Calendar } from 'calendar-link';
import { BiCalendarAlt } from 'react-icons/bi';

const CalendarButton = ({ date, title, description = '', ...props }) => {
  const calendarEvent = {
    title: `Live: ${title}`,
    start: date,
    description,
    duration: [1, 'hour'],
  };
  return (
    <a
      href={add2Calendar(calendarEvent)}
      rel='noreferrer'
      target='_blank'
      {...props}
      style={{
        position: 'absolute',
        right: '0.5em',
        top: '0.5em',
        fontSize: '20px',
        borderRadius: '0.2em',
        borderWidth: '0',
        padding: '0.5em',
        backgroundColor: 'white',
        color: 'black',
        ...props.style,
      }}
    >
      <BiCalendarAlt />
    </a>
  );
};

export default CalendarButton;
