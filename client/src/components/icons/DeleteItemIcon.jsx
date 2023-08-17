import React, { useCallback } from 'react';

import { Button, notification, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteItemIcon = ({
  title,
  message,
  item,
  remove,
  reload = () => {},
  disabled = false,
}) => {
  const handleDelete = useCallback(() => {
    remove(item)
      .then(() => message && notification.success({ message, duration: 3 }))
      .finally(() => {
        reload();
      });
  }, [remove, item, message, reload]);

  return (
    <Popconfirm
      placement="topLeft"
      title={title}
      disabled={disabled}
      onConfirm={handleDelete}
      okText="Șterge"
      cancelText="Anulează"
      okButtonProps={{ icon: <DeleteOutlined /> }}
    >
      <Tooltip title="Șterge">
        <Button
          shape="circle"
          type="link"
          icon={<DeleteOutlined />}
          disabled={disabled}
        />
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteItemIcon;
