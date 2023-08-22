import React, { useState } from 'react';
import { Button, DatePicker, Modal } from 'antd';
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Icon from '../../components/Icon';

const CalendarModal = ({ handleClose, selectedDay, events }) => {
  const [selectedAreas, setSelectedAreas] = useState([]);

  const handleButtonClick = (index) => {
    if (!selectedAreas.includes(index)) {
      setSelectedAreas([...selectedAreas, index]);
    } else {
      setSelectedAreas(selectedAreas.filter((item) => item !== index));
    }
  };
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
      <h4 className="calendar__modal-head">
        {dayjs(selectedDay).format('DD.MM.YYYY')}
      </h4>
      <div className="calendar__modal">
        <div className="calendar__modal-area">
          <h6 className="calendar__modal-area--title">Selecteaza zona</h6>
          <div className="calendar__modal-area--list">
            {[1, 2, 3, 4, 5, 6].map((number, index) => (
              <button
                type="button"
                className={`calendar__modal-area--item ${
                  selectedAreas?.includes(index) ? 'active' : ''
                }`}
                key={number}
                onClick={() => handleButtonClick(index)}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
        <div className="calendar__modal-add">
          <div className="calendar__modal-add--moisture">
            <div className="calendar__modal-title">
              <Icon name="drop" />
              <h6>Adaugă eveniment de umidificare</h6>
            </div>
            <DatePicker className="calendar__modal-picker" picker="time" />

            <Button block type="primary" icon={<PlusOutlined />}>
              Adaugă eveniment
            </Button>
          </div>
          <div className="calendar__modal-add--light">
            <div className="calendar__modal-title">
              <Icon name="sun" />
              <h6>Adaugă eveniment de iluminare</h6>
            </div>
            <DatePicker className="calendar__modal-picker" picker="time" />
            <Button block type="primary" icon={<PlusOutlined />}>
              Adaugă eveniment
            </Button>
          </div>
        </div>
        <div className="calendar__modal-events">
          <h6>Evenimente</h6>
          <div className="calendar__modal-events--list">
            {events.map((event) => {
              if (
                dayjs(event.date).format('DD.MM.YYYY') ===
                dayjs(selectedDay).format('DD.MM.YYYY')
              ) {
                return (
                  <div className="calendar__modal-event" key={event.id}>
                    <div className="calendar__modal-info">
                      <div
                        className="calendar__modal-event-dot"
                        style={{ background: event.backgroundColor }}
                      />
                      <div className="calendar__modal-event-title">
                        {dayjs(event.date).format('HH:mm:ss')}
                      </div>
                      <div className="calendar__modal-event--area">
                        zona - 1
                      </div>
                    </div>
                    <div className="calendar__modal-event--actions">
                      <Icon
                        className="calendar__modal-event--close"
                        name="edit"
                      />
                      <Icon
                        className="calendar__modal-event--close"
                        name="close"
                      />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CalendarModal;
