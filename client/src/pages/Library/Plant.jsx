import React from 'react';
import EditPlantForm from './EditPlantForm';
import { useEditPage } from '../../hooks/useEditPage';
import { findOne, create, update } from '../../services/administration/plants';

const initial = {};

const Plant = ({ id = null, onCancel, reload = () => {}, typeId }) => {
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

  // TODO: loader
  console.log(loading);

  return (
    <EditPlantForm
      plant={entity}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      errors={errors}
      typeId={typeId}
    />
  );
};

export default Plant;
