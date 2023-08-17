import { Segmented } from 'antd';
import React from 'react';
import { findOne } from '../../services/administration/plant_types';
import useDictionaries from '../../hooks/useDictionaries';

const dictionaries = {
  plantTypes: findOne,
};

const LibrarySegment = ({ categoryId }) => {
  const [{ plantTypes }] = useDictionaries(dictionaries);
  console.log(plantTypes, categoryId);
  return (
    <div>
      <Segmented>test</Segmented>
    </div>
  );
};

export default LibrarySegment;
