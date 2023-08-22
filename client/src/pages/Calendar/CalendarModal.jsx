import React from 'react';
import { Modal } from 'antd';
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const CalendarModal = ({ handleClose, selectedDay, events }) => {
  return (
    <Modal
      centered
      open={selectedDay}
      onCancel={handleClose}
      onOk={handleClose}
      title={dayjs(selectedDay).format('DD.MM.YYYY HH:mm:ss')}
      okText="Salvează"
      cancelText="Înapoi"
      cancelButtonProps={{ icon: <RollbackOutlined /> }}
      okButtonProps={{ icon: <SaveOutlined /> }}
    >
      {events.map((event) => {
        if (
          dayjs(event.date).format('DD.MM.YYYY') ===
          dayjs(selectedDay).format('DD.MM.YYYY')
        ) {
          return (
            <div className="calendar__modal">
              <div className="calendar__modal-event">
                <div
                  className="calendar__modal-event-dot"
                  style={{ background: event.backgroundColor }}
                />
                <div className="calendar__modal-event-title">
                  {dayjs(event.date).format('DD.MM.YYYY HH:mm:ss')}
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </Modal>
  );
};

export default CalendarModal;
