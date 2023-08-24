import React from 'react';
import { useEditPage } from '../../../hooks/useEditPage';
import { create, findOne, update } from '../../../services/zones';
import EditZoneForm from './EditZoneForm';

const initial = {};
const Zone = ({ id = null, onCancel, reload = () => {} }) => {
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
    <EditZoneForm
      entity={entity}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      errors={errors}
    />
  );
};

export default Zone;
