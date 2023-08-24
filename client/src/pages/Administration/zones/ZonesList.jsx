import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { remove, findAll as findAllZones } from '../../../services/zones';
import Column from '../../../helpers/Columns';
import AuthContext, { hasPermission } from '../../Login';
import EditItemIcon from '../../../components/icons/EditItemIcon';
import DeleteItemIcon from '../../../components/icons/DeleteItemIcon';
import useDatasource from '../../../hooks/useDatasource';
import Zone from './Zone';
import ZoneMode from '../../../dictionaryes/ZoneMode';

function ZonesList() {
  const {
    user: { permission },
  } = useContext(AuthContext);

  const [updateZone, setUpdateZone] = useState(null);

  const handler = useCallback((...params) => {
    const spec = params[0];
    if (!spec.sort) {
      spec.sort = ['id', 'asc'];
    }
    return findAllZones(spec);
  }, []);

  const { loading, pagination, content, sort, handleChange, reload } =
    useDatasource(handler);

  const columns = useMemo(
    () => [
      Column.text('id', 'ID', {
        width: 25,
      }),
      Column.text('address', 'Index de poziționare', {
        width: 20,
        sort: false,
      }),
      Column.other(
        'plant',
        'Plantă',
        (code, row) => {
          console.log(row);
          return row.plant?.name;
        },
        {
          width: 50,
          filter: true,
        },
      ),
      Column.dictionary('mode', 'Mod setat', ZoneMode, {
        width: 50,
        sort: false,
        filter: true,
      }),

      Column.actions(
        'Acțiune',
        (record) => (
          <span style={{ textAlign: 'right' }}>
            {hasPermission([permission], 'ADMIN') && (
              <EditItemIcon
                onClick={() => {
                  setUpdateZone(record.id);
                }}
              />
            )}
            {hasPermission([permission], 'ADMIN') && (
              <DeleteItemIcon
                title={`Șterge tipul plantei ${record.name}`}
                message="Tipul plantei a fost șters cu succes"
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
        onClick={() => setUpdateZone(true)}
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
        scroll={{ drag: true, x: 500 }}
        rowClassName="animated-row"
      />
      {updateZone ? (
        <Zone
          id={updateZone}
          reload={reload}
          onCancel={() => setUpdateZone(null)}
        />
      ) : null}
    </div>
  );
}

export default ZonesList;
