import React, { useEffect } from 'react';
import { Divider, Form, Input, Modal } from 'antd';
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import useFormErrors from '../../../hooks/useFormErrors';
import RequiredLabel from '../../../components/RequiredLabel';
import { maxLengthValidator } from '../../../utils/Validator';

const EditParameterForm = ({ entity, onSubmit, onCancel, errors }) => {
  const [form] = Form.useForm();
  useFormErrors(form, errors);

  useEffect(() => {
    form.setFieldsValue(entity);
  }, [form, entity]);

  const handleSubmit = () => {
    onSubmit(form.getFieldsValue());
    onCancel();
  };

  return (
    <Modal
      centered
      open={entity}
      onCancel={onCancel}
      onOk={handleSubmit}
      title={entity?.id ? 'Editează parametrul' : 'Crează parametru'}
      okText="Salvează"
      cancelText="Înapoi"
      cancelButtonProps={{ icon: <RollbackOutlined /> }}
      okButtonProps={{ icon: <SaveOutlined /> }}
    >
      <Divider />
      <Form form={form} layout="vertical" initialValues={entity}>
        <Form.Item label={<RequiredLabel title="Cod" />} name="code">
          <Input
            disabled={entity?.id}
            onChange={(e) => {
              form.setFieldsValue({
                code: maxLengthValidator(e.target.value, 10),
              });
            }}
          />
        </Form.Item>
        <Form.Item label={<RequiredLabel title="Denumire" />} name="name">
          <Input
            onChange={(e) => {
              form.setFieldsValue({
                name: maxLengthValidator(e.target.value, 50),
              });
            }}
          />
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
      </Form>
    </Modal>
  );
};

export default EditParameterForm;
