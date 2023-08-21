import React, { useState } from 'react';
import PlantTypeTabs from './PlantTypeTabs';
import PlantsList from './PlantsList';

const Library = () => {
  const [planTypeId, setPlantTypeId] = useState(null);

  return (
    <div className="library">
      <div className="library__content">
        <PlantTypeTabs handleTabChange={setPlantTypeId} />
        <PlantsList typeId={planTypeId} />
      </div>
    </div>
  );
};

export default Library;
