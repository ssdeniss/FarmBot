import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
        width: 25,
      }),
      Column.text('name', 'Denumire', {
        width: 50,
        filter: true,
      }),
      Column.text('description', 'Descriere', {
        width: 200,
        sort: false,
      }),
      Column.actions(
        'Acțiune',
        (record) => (
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
        ),
        { width: 25 },
      ),
    ],
    [reload, permission],
  );

  return (
    <div className="administration__taxonomy">
      <Button
        style={{ marginLeft: 'auto' }}
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setUpdatePlant(true)}
      >
        Adaugă
      </Button>
      <Table
        columns={columns}
        dataSource={content}
        pagination={pagination}
        loading={loading}
        onChange={handleChange}
        sortDirections={sort}
        rowKey="id"
        size="small"
        scroll={{ y: 600, drag: true, x: 500 }}
        rowClassName="animated-row"
      />
      {updatePlant ? (
        <PlantType
          id={updatePlant}
          reload={reload}
          onCancel={() => setUpdatePlant(null)}
        />
      ) : null}
    </div>
  );
};
export default PlantTypesList;
