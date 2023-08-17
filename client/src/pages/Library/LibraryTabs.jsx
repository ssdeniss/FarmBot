import { Tabs } from 'antd';
import React from 'react';
import Icon from '../../components/Icon';
import { findAll } from '../../services/administration/plant_types';
import useDictionaries from '../../hooks/useDictionaries';

const dictionaries = {
  plantTypes: findAll,
};

const LibraryTabs = ({ handleCategoryId }) => {
  const [{ plantTypes }] = useDictionaries(dictionaries);
  // eslint-disable-next-line
  const { loading, content } = plantTypes;
  return (
    <Tabs onChange={handleCategoryId}>
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

export default LibraryTabs;
