import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Select,
} from 'antd';
import {
  DeleteOutlined,
  RollbackOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import Icon from '../../components/Icon';
import EventMode from '../../dictionaries/EventMode';
import { remove, update } from '../../services/events';
import { dayFormat } from '../../constants/date-formats';
import useFormErrors from '../../hooks/useFormErrors';
import RequiredLabel from '../../components/RequiredLabel';

const EventList = ({ content, zones, selectedDay, reload = () => {} }) => {
  const [form] = useForm();
  const [editEvent, setEditEvent] = useState({});
  const [errors, setErrors] = useState(null);

  useFormErrors(form, errors);

  const handleSubmit = () => {
    if (editEvent?.id) {
      const values = form.getFieldsValue();
      update({
        ...values,
        id: editEvent?.id,
        zoneId: editEvent?.zoneId,
      })
        .then(() => {
          setEditEvent({});
          notification.success({ message: 'Datele au fost salvate cu succes' });
        })
        .catch((err) => {
          setErrors(err.inner);
          notification.error({
            message: 'A apărut o eroare la salvarea datelor',
          });
        })
        .finally(() => reload());
    }
  };

  const handleDelete = (e) => {
    remove(e)
      .then(() => reload())
      .catch(() =>
        notification.error({
          message: 'A apărut o eroare la salvarea datelor',
        }),
      )
      .finally(() => reload());
  };

  const getZonelabel = (zoneId) => {
    const zone = zones.find((el) => el.id === zoneId);
    return (
      <div className="calendar__modal-event-area">
        {`${zone?.plant?.name || ''} ${zone?.address + 1 || ''}`}
      </div>
    );
  };

  const getEventLabel = (ev) => {
    return (
      <div className="calendar__modal-event-title">
        {`${ev.title ? ev.title : ''} - ${dayjs(ev.date).format('HH:mm')}`}
      </div>
    );
  };
  const renderEvents = () => {
    return content.map((event) => {
      return (
        <div className="calendar__modal-event" key={event.id}>
          <div className="calendar__modal-info">
            <div
              className="calendar__modal-event-dot"
              style={{ background: event.backgroundColor }}
            />
            {getEventLabel(event)}
            {getZonelabel(event.zoneId)}
          </div>
          <div className="calendar__modal-event--actions">
            <Icon
              className="calendar__modal-event--close"
              name="edit"
              onClick={() => setEditEvent(event)}
            />
            <Popconfirm
              placement="topLeft"
              title={`Șterge evenimentul ${event?.title || ''} ?`}
              onConfirm={() => handleDelete(event)}
              okText="Șterge"
              cancelText="Anulează"
              okButtonProps={{ icon: <DeleteOutlined /> }}
            >
              <Icon className="calendar__modal-event--close" name="close" />
            </Popconfirm>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {renderEvents()}
      <Modal
        centered
        open={editEvent?.id}
        onCancel={() => setEditEvent({})}
        onOk={handleSubmit}
        title="Editează evenimentul"
        okText="Salvează"
        cancelText="Înapoi"
        cancelButtonProps={{ icon: <RollbackOutlined /> }}
        okButtonProps={{ icon: <SaveOutlined /> }}
      >
        <Divider />
        <Form
          form={form}
          layout="vertical"
          initialValues={{ ...editEvent, date: dayjs(editEvent.date) }}
        >
          <Form.Item name="title" label="Titlu">
            <Input />
          </Form.Item>
          <Form.Item
            label={<RequiredLabel title="Mod de funcționare" />}
            name="mode"
          >
            <Select style={{ width: '100%' }} allowClear>
              {EventMode.content.map((row) => (
                <Select.Option value={row.name} key={row.name}>
                  {row.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="date" label={<RequiredLabel title="Timpul" />}>
            <DatePicker
              picker="time"
              onChange={(e) => {
                if (e === null) {
                  form.setFieldsValue({
                    date: dayjs(selectedDay, dayFormat).startOf('day'),
                  });
                }
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EventList;
