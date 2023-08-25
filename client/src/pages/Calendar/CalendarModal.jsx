import React, { useEffect, useMemo, useState } from 'react';
import { Button, DatePicker, Modal, notification } from 'antd';
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Icon from '../../components/Icon';
import { useAreas } from '../../hooks/useAreas';
import { dayFormat } from '../../constants/date-formats';
import EventList from './EventList';
import { create } from '../../services/events';
import EventMode, { MODES } from '../../dictionaries/EventMode';

const CalendarModal = ({ handleClose, selectedDay, events, reload }) => {
  const [onCreateSuccess, setOnCreateSuccess] = useState(null);
  const filteredEvents = useMemo(
    () =>
      events.filter((event) => {
        const eventDate = dayjs(event.date).format(dayFormat);
        return eventDate === selectedDay;
      }),
    [selectedDay, events],
  );

  const { zones, render, selected } = useAreas({});

  const [humidityTime, setHumidityTime] = useState(null);
  const [warmTime, setWarmTime] = useState(null);

  useEffect(() => {
    const timeDate = dayjs(selectedDay, dayFormat).startOf('day');
    setHumidityTime(timeDate);
    setWarmTime(timeDate);
  }, [selectedDay]);

  const handleCreate = (mode) => {
    if (!selected || selected.length < 1) {
      notification.warning({ message: 'Selectați zonele' });
    }
    const date = mode === MODES.HUMIDITY ? humidityTime : warmTime;
    const title = EventMode.content.find((el) => el.name === mode).value;

    selected.forEach((zoneId, index) =>
      create({ title, mode, zoneId, date })
        .then(() => {
          if (index === selected.length - 1) {
            setOnCreateSuccess(true);
          }
        })
        .catch(() => setOnCreateSuccess(false)),
    );
  };

  useEffect(() => {
    if (onCreateSuccess) {
      reload();
      setOnCreateSuccess(null);
    } else if (onCreateSuccess === false) {
      notification.error({
        message: 'A apărut o eroare la salvarea datelor',
      });
    }
  }, [onCreateSuccess, reload]);

  return (
    <Modal
      centered
      open={selectedDay}
      onCancel={handleClose}
      cancelText="Înapoi"
      cancelButtonProps={{
        icon: <RollbackOutlined />,
      }}
      width={1100}
      okButtonProps={{ style: { display: 'none' } }}
    >
      <h4 className="calendar__modal-head">{selectedDay}</h4>
      <div className="calendar__modal">
        <div className="calendar__modal-area">
          <h6 className="calendar__modal-area--title">Selecteaza zona</h6>
          <div className="calendar__modal-area--list">{render()}</div>
        </div>
        <div className="calendar__modal-add">
          <div className="calendar__modal-add--moisture">
            <div className="calendar__modal-title">
              <Icon name="drop" />
              <h6>Adaugă eveniment de umidificare</h6>
            </div>
            <DatePicker
              className="calendar__modal-picker"
              picker="time"
              value={humidityTime}
              onChange={setHumidityTime}
            />

            <Button
              block
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleCreate(MODES.HUMIDITY)}
            >
              Adaugă eveniment
            </Button>
          </div>
          <div className="calendar__modal-add--light">
            <div className="calendar__modal-title">
              <Icon name="sun" />
              <h6>Adaugă eveniment de iluminare</h6>
            </div>
            <DatePicker
              className="calendar__modal-picker"
              picker="time"
              value={warmTime}
              onChange={setWarmTime}
            />
            <Button
              block
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleCreate(MODES.TEMPERATURE)}
            >
              Adaugă eveniment
            </Button>
          </div>
        </div>
        <div className="calendar__modal-events">
          <h6>Evenimente</h6>
          <div className="calendar__modal-events--list">
            <EventList
              content={filteredEvents}
              zones={zones}
              selectedDay={selectedDay}
              reload={reload}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CalendarModal;
