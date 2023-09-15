import React, { useCallback, useEffect, useState } from 'react';
import { Select } from 'antd';
import { findByCode } from '../services/administration/parameters';
import { findAll as findAllZones } from '../services/zones';
import useDictionaries from './useDictionaries';

const ZONES_COUNT_CODE = 'ZONE_COUNT';

const dictionaries = {
  zones: findAllZones,
};

const TYPES = {
  DROPDOWN: 'dropdown',
  AREAS: 'areas',
};

export const useAreas = ({
  type = TYPES.AREAS,
  render = true,
  multiple = true,
}) => {
  const [selected, setSelected] = useState([]);
  const [zonesCount, setZonesCount] = useState(0);

  const [{ zones }, reload] = useDictionaries(dictionaries);

  useEffect(() => {
    findByCode(ZONES_COUNT_CODE).then((res) => setZonesCount(res.value));
  }, []);

  const handleAreaClick = useCallback(
    (id) => {
      if (multiple) {
        setSelected((prev) => {
          if (prev.includes(id)) {
            return prev.filter((zoneId) => zoneId !== id);
          }
          return [...prev, id];
        });
      } else {
        setSelected([id]);
      }
    },
    [multiple],
  );

  const areas = useCallback(() => {
    return Array.from({ length: zonesCount }, (_, index) => {
      const curentZone = zones?.content?.find((el) => el.address === index);
      return (
        <button
          type="button"
          className={`calendar__modal-area--item ${
            selected?.includes(curentZone?.id) ? 'active' : ''
          }`}
          key={'index:'
            .concat(index.toString())
            .concat('id:')
            .concat(curentZone?.id)}
          onClick={() =>
            curentZone ? handleAreaClick(curentZone.id) : () => {}
          }
          disabled={!curentZone?.id}
        >
          {curentZone?.id
            ? `${curentZone?.plant?.name || ''}
              ${curentZone?.address + 1}`
            : 'Nu există zonă înregistrată'}
        </button>
      );
    });
  }, [handleAreaClick, selected, zones?.content, zonesCount]);

  const dropdown = useCallback(() => {
    return (
      <Select
        onChange={setSelected}
        mode={multiple ? 'multiple' : undefined}
        style={{ width: '100%' }}
        onClear={() => setSelected([])}
        allowClear
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) !== -1
        }
      >
        {zones.content
          .filter((el) => el.address)
          .map((option) => (
            <Select.Option key={option.id} value={option.id} width="100%">
              {`index:${option.address} ${option.plant?.name || ''} `}
            </Select.Option>
          ))}
      </Select>
    );
  }, [zones?.content, multiple]);

  const renderFunc = useCallback(() => {
    if (render) {
      switch (type) {
        case TYPES.AREAS:
          return <div className="calendar__modal-area--list">{areas()}</div>;
        case TYPES.DROPDOWN:
          return dropdown();
        default:
          return null;
      }
    }
    return null;
  }, [render, type, areas, dropdown]);

  const clear = useCallback(() => {
    setSelected([]);
  }, []);

  return {
    zones: zones?.content,
    render: renderFunc,
    zonesCount,
    selected,
    reload,
    clear,
  };
};
