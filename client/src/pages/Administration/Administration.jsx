import React, { useCallback, useState } from 'react';
import PlantTypesList from './plant-types/PlantTypesList';

const KEYS = {
  PLANT_TYPES: 'plant_types',
};

const Administration = () => {
  const [key, setKey] = useState(KEYS.PLANT_TYPES);

  const renderPageList = useCallback(() => {
    switch (key) {
      case KEYS.PLANT_TYPES:
        return <PlantTypesList />;
      default:
        return <></>;
    }
  }, [key]);

  const switchKey = (newKey) => {
    setKey((prev) => (prev === newKey ? null : newKey));
  };

  return (
    <div className="administration">
      <div className="administration__tabs">
        <button
          type="button"
          className={`administration__tab ${
            key === KEYS.PLANT_TYPES ? 'active' : ''
          }`}
          onClick={() => switchKey(KEYS.PLANT_TYPES)}
        >
          Tipuri de plante
        </button>
      </div>
      {renderPageList()}
    </div>
  );
};

export default Administration;
