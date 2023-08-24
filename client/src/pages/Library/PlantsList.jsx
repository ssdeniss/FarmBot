import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  findAll as findAllPlants,
  remove,
} from '../../services/administration/plants';
import useDatasource from '../../hooks/useDatasource';
import EditItemIcon from '../../components/icons/EditItemIcon';
import Column from '../../helpers/Columns';
import AuthContext, { hasPermission } from '../Login';
import DeleteItemIcon from '../../components/icons/DeleteItemIcon';
import Plant from './Plant';

const PlantsList = ({ typeId }) => {
  const {
    user: { permission },
  } = useContext(AuthContext);

  const handler = useCallback(
    (...params) => {
      const spec = params[0];
      if (!spec.criterias) {
        spec.criterias = {};
      }
      if (!spec.sort) {
        spec.sort = ['id', 'asc'];
      }
      spec.criterias.typeId = typeId;
      return findAllPlants(spec);
    },
    [typeId],
  );

  const { loading, pagination, content, sort, handleChange, reload } =
    useDatasource(handler, { allowFetcher: !!typeId });

  useEffect(() => {
    if (typeId) {
      reload();
    }
  }, [typeId, reload]);

  const [updatePlant, setUpdatePlant] = useState(false);

  const columns = useMemo(
    () => [
      Column.text('id', 'ID', {
        width: 25,
      }),
      Column.text('name', 'Denumire', {
        width: 50,
        filter: true,
        toUpperCase: false,
      }),
      Column.text('description', 'Descriere', {
        width: 200,
        sort: false,
        toUpperCase: false,
      }),
      {
        title: 'Umeditatea',
        key: 'humidity',
        sort: true,
        width: 40,
        render: (row) => {
          return (
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <div>{row.humidityMin} %</div>-<div>{row.humidityMax} %</div>
            </div>
          );
        },
      },
      {
        title: 'Temperatura',
        key: 'temperature',
        sort: true,
        width: 40,
        render: (row) => {
          return (
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <div>{row.temperatureMin} °C</div>-
              <div>{row.temperatureMax} °C</div>
            </div>
          );
        },
      },
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
                message="Planta a fost ștersă cu succes"
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
        scroll={{ drag: true, x: 500, y: 600 }}
        rowClassName="animated-row"
      />
      {updatePlant ? (
        <Plant
          id={updatePlant}
          reload={reload}
          onCancel={() => setUpdatePlant(null)}
        />
      ) : null}
    </div>
  );
};

export default PlantsList;
