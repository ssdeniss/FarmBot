import React, { useCallback, useEffect, useState } from 'react';
import { findByCode } from '../services/administration/parameters';
import { findAll as findAllZones } from '../services/zones';
import useDictionaries from '../hooks/useDictionaries';

const ZONES_COUNT_CODE = 'ZONE_COUNT';

const dictionaries = {
  zones: findAllZones,
};

function Areas() {
  const [selected, setSelected] = useState([]);
  const [zonesCount, setZonesCount] = useState(0);

  const [{ zones }] = useDictionaries(dictionaries);

  useEffect(() => {
    findByCode(ZONES_COUNT_CODE).then((res) => setZonesCount(res.value));
  }, []);

  const handleAreaClick = useCallback((index) => {
    setSelected((prev) => {
      if (prev.includes(index)) {
        return prev.filter((el) => el !== index);
      }
      return [...prev, index];
    });
  }, []);

  const renderAreas = useCallback(() => {
    return Array.from(
      { length: zonesCount },
      (_, index) => {
        const curentZone = zones?.content?.find((el) => el.address === index);

        return (
          <button
            type="button"
            className={`calendar__modal-area--item ${
              selected?.includes(index) ? 'active' : ''
            }`}
            key={index}
            onClick={() => (curentZone ? handleAreaClick(index) : () => {})}
          >
            {curentZone?.plant?.name ||
              curentZone?.address ||
              'Nu există zonă înregistrată'}
          </button>
        );
      },
      [zonesCount, zones],
    );
  }, [zonesCount, zones, selected, handleAreaClick]);

  return <div className="calendar__modal-area--list">{renderAreas()}</div>;
}

export default Areas;
