import React, { useCallback, useState } from 'react';
import { Button } from 'antd';
import PlantTypesList from './plant-types/PlantTypesList';

const KEYS = {
  PLANT_TYPES: 'plant_types',
};

const Administration = () => {
  const [key, setKey] = useState(null);

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
      <div className="container">
        <Button type="primary" onClick={() => switchKey(KEYS.PLANT_TYPES)}>
          Tipuri de plante
        </Button>
        {renderPageList()}
      </div>
    </div>
  );
};

export default Administration;
