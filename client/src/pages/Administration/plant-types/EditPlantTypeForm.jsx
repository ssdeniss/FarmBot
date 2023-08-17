import React, { useEffect } from 'react';
import { Divider, Form, Input, Modal } from 'antd';
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import useFormErrors from '../../../hooks/useFormErrors';
import RequiredLabel from '../../../components/RequiredLabel';

const EditPlantTypeForm = ({ entity, onSubmit, onCancel, errors }) => {
  console.log(entity);

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
      title={entity?.id ? 'Editează tipul plantei' : 'Crează tip plantă'}
      okText="Salvează"
      cancelText="Înapoi"
      cancelButtonProps={{ icon: <RollbackOutlined /> }}
      okButtonProps={{ icon: <SaveOutlined /> }}
    >
      <Divider />
      <Form form={form} layout="vertical" initialValues={entity}>
        <Form.Item label={<RequiredLabel title="Denumire" />} name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Descriere" name="description">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPlantTypeForm;
