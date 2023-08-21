import React, { useEffect } from 'react';
import { Col, Divider, Form, Input, Modal, Row, Select } from 'antd';
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import useFormErrors from '../../hooks/useFormErrors';
import RequiredLabel from '../../components/RequiredLabel';
import { findAll } from '../../services/administration/plant_types';
import useDatasource from '../../hooks/useDatasource';
import {
  dotValidator,
  floatValidator,
  maxLengthValidator,
} from '../../utils/Validator';

// eslint-disable-next-line
const EditPlantForm = ({ plant, onSubmit, onCancel, errors }) => {
  console.log(plant);
  // eslint-disable-next-line
  const { loading, pagination, content, sort, handleChange, reload } =
    useDatasource(findAll);
  const [form] = Form.useForm();
  useFormErrors(form, errors);

  useEffect(() => {
    form.setFieldsValue(plant);
  }, [form, plant]);

  const handleSubmit = () => {
    onSubmit(form.getFieldsValue());
    onCancel();
  };
  console.log(content);
  return (
    <Modal
      centered
      open={plant}
      onCancel={onCancel}
      onOk={handleSubmit}
      title={plant?.id ? 'Editează planta' : 'Adaugă o plantă'}
      okText="Salvează"
      cancelText="Înapoi"
      cancelButtonProps={{ icon: <RollbackOutlined /> }}
      okButtonProps={{ icon: <SaveOutlined /> }}
    >
      <Divider />
      <Form form={form} layout="vertical" initialValues={plant}>
        <Form.Item label={<RequiredLabel title="Denumire" />} name="name">
          <Input
            onChange={(e) => {
              form.setFieldsValue({
                name: maxLengthValidator(e.target.value, 25),
              });
            }}
          />
        </Form.Item>
        <Form.Item label={<RequiredLabel title="Tipul" />} name="typeId">
          <Select style={{ width: '100%' }}>
            {content.map((row) => (
              <Select.Option value={row.id} key={row.id}>
                {row.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Descriere" name="description">
          <Input
            onChange={(e) => {
              form.setFieldsValue({
                description: maxLengthValidator(e.target.value, 255),
              });
            }}
          />
        </Form.Item>
        <Row gutter={15}>
          <Col span={12}>
            <Form.Item label="Umeditatea minimă %" name="humidityMin">
              <Input
                onChange={(e) => {
                  form.setFieldsValue({
                    humidityMin: floatValidator(
                      dotValidator(e.target.value),
                      3,
                      2,
                    ),
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Umeditatea maximă %" name="humidityMax">
              <Input
                onChange={(e) => {
                  form.setFieldsValue({
                    humidityMax: floatValidator(
                      dotValidator(e.target.value),
                      3,
                      2,
                    ),
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={12}>
            <Form.Item label="Temperatura minimă °C" name="temperatureMin">
              <Input
                onChange={(e) => {
                  form.setFieldsValue({
                    temperatureMin: floatValidator(
                      dotValidator(e.target.value),
                      3,
                      2,
                    ),
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Temperatura maximă °C" name="temperatureMax">
              <Input
                onChange={(e) => {
                  form.setFieldsValue({
                    temperatureMax: floatValidator(
                      dotValidator(e.target.value),
                      3,
                      2,
                    ),
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditPlantForm;
