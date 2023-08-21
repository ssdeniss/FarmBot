import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      contentHeight={700}
      eventClick={console.log('test')}
      events={[
        { title: 'event 1', date: '2023-08-01' },
        { title: 'event 2', date: '2023-08-01' },
        { title: 'event 3', date: '2023-08-09' },
      ]}
    />
  );
};

export default Calendar;
