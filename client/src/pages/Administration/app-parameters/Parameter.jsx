import React from 'react';
import {
  findOne,
  create,
  update,
} from '../../../services/administration/parameters';
import { useEditPage } from '../../../hooks/useEditPage';
import EditParameterForm from './EditParameterForm';

const initial = {};
const Parameter = ({ id = null, onCancel, reload = () => {} }) => {
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

  return (
    <EditParameterForm
      entity={entity}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      errors={errors}
    />
  );
};

export default Parameter;
