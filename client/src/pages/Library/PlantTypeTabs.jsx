import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import Icon from '../../components/Icon';
import { findAll } from '../../services/administration/plant_types';
import useDictionaries from '../../hooks/useDictionaries';

const dictionaries = {
  plantTypes: findAll,
};

const PlantTypeTabs = ({ handleTabChange }) => {
  const [{ plantTypes }] = useDictionaries(dictionaries);

  // TODO: loader
  const { loading, content } = plantTypes;
  console.log(loading);

  useEffect(() => {
    if (content.length > 0) {
      handleTabChange(content[0].id);
    }
    console.log('test');
    // eslint-disable-next-line
  }, [content.length]);

  return (
    <Tabs onChange={handleTabChange}>
      {content?.length
        ? content.map((plant) => {
            return (
              <Tabs.TabPane
                key={plant.id}
                tab={
                  <div className="library__tab-title">
                    <Icon
                      className="library__tab-icon"
                      name={plant.name.toLocaleLowerCase()}
                    />
                    <div>{plant.name}</div>
                  </div>
                }
              />
            );
          })
        : null}
    </Tabs>
  );
};

export default PlantTypeTabs;
