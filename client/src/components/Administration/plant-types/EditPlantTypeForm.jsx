import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import useFormErrors from '../../../hooks/useFormErrors';

const EditPlantTypeForm = ({ entity, onSubmit, onCancel, errors }) => {
  console.log(entity);

  const [form] = Form.useForm();
  useFormErrors(form, errors);

  useEffect(() => {
    form.setFieldsValue(entity);
  }, [form, entity]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={entity}
        onFinish={onSubmit}
      >
        <Form.Item label="Denumire" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Descriere" name="description">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditPlantTypeForm;
