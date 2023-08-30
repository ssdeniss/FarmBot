import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Divider, Form, notification, Select, Slider } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useAreas } from '../../hooks/useAreas';
import ZoneMode from '../../dictionaries/ZoneMode';
import { update } from '../../services/zones';
import { findAll as findAllPlants } from '../../services/administration/plants';
import { findAll as findAllTypes } from '../../services/administration/plant_types';
import useDictionaries from '../../hooks/useDictionaries';
import Icon from '../../components/Icon';

const dictionaries = {
  plants: findAllPlants,
  plantTypes: findAllTypes,
};

const Home = () => {
  const [form] = useForm();
  const [zone, setZone] = useState({});

  const [{ plants, plantTypes }] = useDictionaries(dictionaries);

  const { render, selected, zones, reload, clear } = useAreas({
    type: 'areas',
    multiple: false,
  });

  const temperatureMarks = useMemo(
    () => ({
      0: '0°C',
      [zone?.plant?.temperatureMin]: `${zone?.plant?.temperatureMin}°C`,
      [zone?.plant?.temperatureMax]: `${zone?.plant?.temperatureMax}°C`,
      100: '100°C',
    }),
    [zone?.plant],
  );

  const humidityMarks = {
    0: '0%',
    [zone?.plant?.humidityMin]: `${zone?.plant?.humidityMin}°C`,
    [zone?.plant?.humidityMax]: `${zone?.plant?.humidityMax}°C`,
    100: '100%',
  };

  const handlePlant = useCallback(() => {
    const { mode, plantId, temperature, humidity } = form.getFieldsValue();

    if (!plantId) {
      notification.warning({ message: 'Selecteaza planta' });
      return;
    }

    const plant = plants?.content?.find((el) => el.id === plantId);
    [plant.temperatureMin, plant.temperatureMax] = temperature ?? [
      plant.temperatureMin,
      plant.temperatureMax,
    ];
    [plant.humidityMin, plant.humidityMax] = humidity ?? [
      plant.humidityMin,
      plant.humidityMax,
    ];

    update({ ...zone, mode, plant })
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
    const humidity = [zone?.plant?.humidityMin, zone?.plant?.humidityMax];
    const temperature = [
      zone?.plant?.temperatureMin,
      zone?.plant?.temperatureMax,
    ];

    form.setFieldsValue({
      ...zone,
      plantId: zone?.plant?.id,
      humidity,
      temperature,
    });
  }, [zone, form]);

  return (
    <div className="home">
      <div className={`home__areas ${!zone?.id ? 'active' : ''}`}>
        {render()}
      </div>

      <div className={`home__area ${zone?.id ? 'active' : ''}`}>
        <div className="home__area-container">
          <h3>Zona nr. {zone?.address + 1}</h3>
          {zone?.plant?.typeId ? (
            <Icon
              name={
                plantTypes?.content?.find((el) => el.id === zone?.plant?.typeId)
                  ?.name || 'default'
              }
            />
          ) : null}
          <div className="home__area-ground">content</div>
          {/* sfarsit patrat ||| Poate
          slider pentru umiditate, temperatura la planta? (pentru a modifica si
          de aici temperatura sau umiditatea) ++ Imagine la planta P.S. datele
          la planta o sa se schimbe automat daca le schimbam in update(... plant
          .some new.) */}
        </div>
        <div className="home__area-info">
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
            {zone?.plant?.id ? (
              <>
                <Form.Item
                  name="humidity"
                  label="Umiditatea"
                  labelCol={{ span: 24 }}
                >
                  <Slider range marks={humidityMarks} />
                </Form.Item>
                <Form.Item
                  name="temperature"
                  label="Temperatura"
                  labelCol={{ span: 24 }}
                >
                  <Slider
                    range
                    marks={temperatureMarks}
                    disabled={!zone?.plant?.id}
                  />
                </Form.Item>
              </>
            ) : null}
            <Button
              className="home__btn-plant"
              block
              type="primary"
              onClick={handlePlant}
            >
              {zone?.plant?.id ? 'Modifică' : 'Plantează'}
            </Button>
            <Divider />
            <Button block onClick={clear}>
              Înapoi
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Home;
