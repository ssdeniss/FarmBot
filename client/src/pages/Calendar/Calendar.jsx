import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarModal from './CalendarModal';

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDatesSet = (e) => {
    console.log('Visible range:', e.dateStr);
    setSelectedDay(e.dateStr);
  };

  const handleClose = () => {
    setSelectedDay(false);
  };
  const events = [
    {
      title: 'event 1',
      date: '2023-08-01T10:11:37Z',
      id: 1,
      backgroundColor: '#1890ff',
      groupId: 'water',
    },
    {
      title: 'event 2',
      date: '2023-08-01T10:11:37Z',
      id: 2,
      backgroundColor: '#1890ff',
      groupId: 'sun',
    },
    {
      title: 'event 2',
      date: '2023-08-01T10:11:37Z',
      id: 2,
      backgroundColor: '#1890ff',
      groupId: 'sun',
    },
    {
      title: 'event 2',
      date: '2023-08-01T10:11:37Z',
      id: 2,
      backgroundColor: '#1890ff',
      groupId: 'sun',
    },
    {
      title: 'event 2',
      date: '2023-08-01T10:11:37Z',
      id: 2,
      backgroundColor: '#1890ff',
      groupId: 'sun',
    },
    {
      title: 'event 2',
      date: '2023-08-01T10:11:37Z',
      id: 2,
      backgroundColor: '#1890ff',
      groupId: 'sun',
    },
    {
      title: 'event 2',
      date: '2023-08-01T10:11:37Z',
      id: 2,
      backgroundColor: '#f4ca16',
      groupId: 'sun',
    },
    {
      title: 'event 2',
      date: '2023-08-01T10:11:37Z',
      id: 2,
      backgroundColor: '#f4ca16',
      groupId: 'sun',
    },
    {
      title: 'event 2',
      date: '2023-08-01T10:11:37Z',
      id: 2,
      backgroundColor: '#f4ca16',
      groupId: 'sun',
    },
    {
      title: 'event 2',
      date: '2023-08-01T10:11:37Z',
      id: 2,
      backgroundColor: '#f4ca16',
      groupId: 'sun',
    },
    {
      title: 'event 2',
      date: '2023-08-01T10:11:37Z',
      id: 2,
      backgroundColor: '#f4ca16',
      groupId: 'sun',
    },
    {
      title: 'event 3',
      date: '2023-08-03T23:11:37Z',
      backgroundColor: '#f4ca16',
      id: 3,
    },
  ];

  const titleFormatOptions = {
    year: 'numeric',
    month: 'long',
  };

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        contentHeight={750}
        dateClick={(e) => handleDatesSet(e)}
        navLinkDayClick={(click) => console.log(click)}
        eventClick={(click) => console.log(click.event.id)}
        dayMaxEvents={2}
        titleFormat={titleFormatOptions}
        events={events}
      />
      <CalendarModal
        selectedDay={selectedDay}
        handleClose={handleClose}
        events={events}
      />
    </div>
  );
};

export default Calendar;
