import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Button, Table } from 'antd';
import {
  findAll as findAllPlantTypes,
  remove,
} from '../../../services/administration/plant_types';
import Column from '../../../helpers/Columns';
import AuthContext, { hasPermission } from '../../Login';
import EditItemIcon from '../../../components/icons/EditItemIcon';
import DeleteItemIcon from '../../../components/icons/DeleteItemIcon';
import PlantType from './PlantType';
import useDatasource from '../../../hooks/useDatasource';

const PlantTypesList = () => {
  const {
    user: { permission },
  } = useContext(AuthContext);

  const handler = useCallback((...params) => {
    const spec = params[0];
    if (!spec.sort) {
      spec.sort = ['id', 'asc'];
    }
    return findAllPlantTypes(spec);
  }, []);

  const { loading, pagination, content, sort, handleChange, reload } =
    useDatasource(handler);

  const [updatePlant, setUpdatePlant] = useState(false);

  const columns = useMemo(
    () => [
      Column.text('id', 'ID', {
        width: 50,
      }),
      Column.text('name', 'Denumire', {
        width: 100,
        filter: true,
      }),
      Column.text('description', 'Descriere', {
        width: 100,
        sort: false,
      }),
      Column.actions('Acțiune', (record) => (
        <span style={{ textAlign: 'right' }}>
          {hasPermission([permission], 'ADMIN') && (
            <EditItemIcon
              onClick={() => {
                setUpdatePlant(record.id);
              }}
            />
          )}
          {hasPermission([permission], 'ADMIN') && (
            <DeleteItemIcon
              title={`Șterge tipul plantei ${record.name}`}
              message="Succes"
              item={record}
              remove={remove}
              reload={reload}
            />
          )}
        </span>
      )),
    ],
    [reload, permission],
  );

  return (
    <>
      <Button onClick={() => setUpdatePlant(true)}>Add</Button>
      <Table
        columns={columns}
        dataSource={content}
        pagination={pagination}
        loading={loading}
        onChange={handleChange}
        sortDirections={sort}
        rowKey="id"
        size="small"
      />
      {updatePlant ? (
        <PlantType
          id={updatePlant}
          reload={reload}
          onCancel={() => setUpdatePlant(null)}
        />
      ) : null}
    </>
  );
};
export default PlantTypesList;
