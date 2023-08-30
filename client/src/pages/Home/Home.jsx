import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, notification, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useAreas } from '../../hooks/useAreas';
import ZoneMode from '../../dictionaries/ZoneMode';
import { update } from '../../services/zones';
import { findAll as findAllPlants } from '../../services/administration/plants';
import useDictionaries from '../../hooks/useDictionaries';

const dictionaries = {
  plants: findAllPlants,
};

const Home = () => {
  const [form] = useForm();
  const [zone, setZone] = useState({});

  const [{ plants }] = useDictionaries(dictionaries);

  const { render, selected, zones, reload, clear } = useAreas({
    type: 'areas',
    multiple: false,
  });

  const handlePlant = useCallback(() => {
    const data = form.getFieldsValue();
    const plant = plants?.content?.find((el) => el.id === data.plantId);

    update({ ...zone, ...data, plant })
      .then(() =>
        notification.success({ message: 'Datele au fost salvate cu succes' }),
      )
      .catch(() =>
        notification.error({
          message: 'A apărut o eroare la salvarea datelor',
        }),
      )
      .finally(() => reload());
  }, [reload, zone, form, plants?.content]);

  useEffect(() => {
    const selectedZone = zones.find((el) => selected.includes(el.id));
    setZone(selectedZone);
  }, [selected, zones]);

  useEffect(() => {
    form.setFieldsValue({ ...zone, plantId: zone?.plant?.id });
  }, [zone, form]);

  return (
    <>
      {/* TODO: refactor la ceia ce ii mai jos */}
      {!zone?.id ? (
        render()
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '500px',
              height: '500px',
              border: '3px solid black',
              borderRadius: '10px',
            }}
          >
            Aici patrat la zona ({zone.address + 1}) sfarsit patrat ||| Poate
            slider pentru umiditate, temperatura la planta? (pentru a modifica
            si de aici temperatura sau umiditatea) ++ Imagine la planta P.S.
            datele la planta o sa se schimbe automat daca le schimbam in
            update(... plant .some new.)
          </div>
          <Form form={form} initialValues={zone}>
            <Form.Item
              label="Mod de funcționare"
              name="mode"
              labelCol={{ span: 24 }}
            >
              <Select style={{ width: '100%' }} allowClear>
                {ZoneMode.content.map((row) => (
                  <Select.Option value={row.name} key={row.name}>
                    {row.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Plantă"
              name="plantId"
              initialValue={zone?.plant?.id}
              labelCol={{ span: 24 }}
            >
              <Select
                disabled={zone?.plant?.id}
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) !==
                  -1
                }
              >
                {plants.content
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                      {`${option.name}`}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Row style={{ gap: '20px', marginTop: '25px' }}>
              <Button onClick={clear}>Înapoi</Button>
              <Button type="primary" onClick={handlePlant}>
                {zone?.plant?.id ? 'Modifică' : 'Plantează'}
              </Button>
            </Row>
          </Form>
        </div>
      )}
    </>
  );
};
export default Home;
