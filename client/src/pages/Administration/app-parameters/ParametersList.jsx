import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  findAll as findAllParameters,
  remove,
} from '../../../services/administration/parameters';
import Column from '../../../helpers/Columns';
import AuthContext, { hasPermission } from '../../Login';
import EditItemIcon from '../../../components/icons/EditItemIcon';
import DeleteItemIcon from '../../../components/icons/DeleteItemIcon';
import useDatasource from '../../../hooks/useDatasource';
import Parameter from './Parameter';

const ParametersList = () => {
  const {
    user: { permission },
  } = useContext(AuthContext);

  const handler = useCallback((...params) => {
    const spec = params[0];
    if (!spec.sort) {
      spec.sort = ['id', 'asc'];
    }
    return findAllParameters(spec);
  }, []);

  const { loading, pagination, content, sort, handleChange, reload } =
    useDatasource(handler);

  const [updateParameter, setUpdateParameter] = useState(false);

  const columns = useMemo(
    () => [
      Column.text('id', 'ID', {
        width: 25,
      }),
      Column.text('code', 'Cod', {
        width: 50,
        filter: true,
      }),
      Column.text('name', 'Denumire', {
        width: 75,
        filter: true,
      }),
      Column.text('value', 'Valoare', {
        width: 50,
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
                  setUpdateParameter(record.id);
                }}
              />
            )}
            {hasPermission([permission], 'ADMIN') && (
              <DeleteItemIcon
                title={`Șterge parametrul ${record.name}`}
                message="Parametrul a fost șters cu succes"
                item={record}
                remove={remove}
                reload={reload}
              />
            )}
          </span>
        ),
        { width: 50 },
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
        onClick={() => setUpdateParameter(true)}
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
      {updateParameter ? (
        <Parameter
          id={updateParameter}
          reload={reload}
          onCancel={() => setUpdateParameter(null)}
        />
      ) : null}
    </div>
  );
};
export default ParametersList;
