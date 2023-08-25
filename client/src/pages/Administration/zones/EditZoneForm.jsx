import React, { useEffect, useState } from 'react';
import { Divider, Form, Input, Modal, Select } from 'antd';
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import useFormErrors from '../../../hooks/useFormErrors';
import { numberValidator } from '../../../utils/Validator';
import ZoneMode from '../../../dictionaries/ZoneMode';
import useDictionaries from '../../../hooks/useDictionaries';
import { findAll as findAllPlants } from '../../../services/administration/plants';
import { findAll as findAllPlantTypes } from '../../../services/administration/plant_types';

const dictionaries = {
  plantTypes: findAllPlantTypes,
  plants: findAllPlants,
};
const EditZoneForm = ({ entity, onSubmit, onCancel, errors }) => {
  const [{ plantTypes, plants }] = useDictionaries(dictionaries);
  const [plantTypeId, setPlantTypeId] = useState(null);

  const [form] = Form.useForm();
  useFormErrors(form, errors);

  useEffect(() => {
    form.setFieldsValue(entity);
    setPlantTypeId(entity?.plant?.typeId);
  }, [form, entity]);

  const handleSubmit = () => {
    const plant = plants?.content?.find(
      (el) => el.id === form.getFieldValue('plantId'),
    );
    onSubmit({ ...form.getFieldsValue(), plant });
    onCancel();
  };

  return (
    <Modal
      centered
      open={entity}
      onCancel={onCancel}
      onOk={handleSubmit}
      title={entity?.id ? 'Editează zona' : 'Crează zonă'}
      okText="Salvează"
      cancelText="Înapoi"
      cancelButtonProps={{ icon: <RollbackOutlined /> }}
      okButtonProps={{ icon: <SaveOutlined /> }}
    >
      <Divider />
      <Form form={form} layout="vertical" initialValues={entity}>
        <Form.Item label="Tipul plantei">
          <Select
            defaultValue={entity?.plant?.typeId}
            onSelect={setPlantTypeId}
            allowClear
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) !== -1
            }
          >
            {plantTypes.content.map((option) => (
              <Select.Option key={option.id} value={option.id}>
                {`${option.name}`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Plantă"
          name="plantId"
          initialValue={entity?.plant?.id}
        >
          <Select
            disabled={!plantTypeId}
            allowClear
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) !== -1
            }
          >
            {plants.content
              .filter((el) => el.typeId === plantTypeId)
              .map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  {`${option.name}`}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Mod de funcționare" name="mode">
          <Select style={{ width: '100%' }} allowClear>
            {ZoneMode.content.map((row) => (
              <Select.Option value={row.name} key={row.name}>
                {row.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Index de poziționare" name="address">
          <Input
            onChange={(e) => {
              form.setFieldsValue({
                address: numberValidator(e.target.value, 2),
              });
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditZoneForm;
