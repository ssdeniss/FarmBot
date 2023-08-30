import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import CalendarModal from './CalendarModal';
import { findAll as findAllEvents } from '../../services/events';
import useDatasource from '../../hooks/useDatasource';
import { dayFormat } from '../../constants/date-formats';
import { useAreas } from '../../hooks/useAreas';
import { MODES } from '../../dictionaries/EventMode';

const TITLE_FORMAT_OPTIONS = {
  year: 'numeric',
  month: 'long',
};

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [monthRangeTime, setMonthRangeTime] = useState();
  const { render, selected } = useAreas({ type: 'dropdown' });

  const handler = useCallback(
    (...params) => {
      const spec = params[0];
      if (!spec.criterias) {
        spec.criterias = {};
      }
      if (selected) {
        spec.criterias.zoneId = selected;
      }
      spec.criterias.start = monthRangeTime.start.toISOString();
      spec.criterias.end = monthRangeTime.end.toISOString();

      return findAllEvents(spec);
    },
    [monthRangeTime, selected],
  );

  const { loading, content, reload } = useDatasource(handler);

  const events = useMemo(() => {
    return content.map((el) => ({
      ...el,
      backgroundColor: el.mode === MODES.TEMPERATURE ? '#f4ca16' : '#1890ff',
    }));
  }, [content]);

  useEffect(() => {
    if (monthRangeTime || selected) {
      reload();
    }
  }, [monthRangeTime, selected, reload]);

  const handleDatesSet = (e) => {
    if (e.date) {
      setSelectedDay(dayjs(e.date).format(dayFormat));
    }
  };

  const handleClose = () => {
    setSelectedDay(false);
  };

  return (
    <div className="calendar">
      <div className="calendar__area-select">
        <div className="calendar__area-select--title">Selectează zonele</div>
        {render()}
      </div>

      <FullCalendar
        loading={loading}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        contentHeight={750}
        dateClick={handleDatesSet}
        datesSet={setMonthRangeTime}
        dayMaxEvents={2}
        titleFormat={TITLE_FORMAT_OPTIONS}
        events={events}
        buttonText={{ today: 'Ziua curentă' }}
      />
      <CalendarModal
        selectedDay={selectedDay}
        handleClose={handleClose}
        events={events}
        reload={reload}
      />
    </div>
  );
};

export default Calendar;
