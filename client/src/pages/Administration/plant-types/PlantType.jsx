import React from 'react';
import EditPlantTypeForm from './EditPlantTypeForm';
import {
  findOne,
  create,
  update,
} from '../../../services/administration/plant_types';
import { useEditPage } from '../../../hooks/useEditPage';

const initial = {};
const PlantType = ({ id = null, onCancel, reload = () => {} }) => {
  const [entity, handleSubmit, handleCancel, errors, loading] = useEditPage({
    id: typeof id === 'number' ? id : null,
    isNew: typeof id !== 'number',
    initial,
    existent: findOne,
    onCreate: create,
    onUpdate: update,
    onSuccess: reload,
    onCancel,
  });

  // TODO: add app loader for loading
  console.log('TODO here -> ', loading);
  console.log(entity);

  return (
    <EditPlantTypeForm
      entity={entity}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      errors={errors}
    />
  );
};

export default PlantType;
