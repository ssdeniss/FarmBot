import React from 'react';
import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const EditItemIcon = ({ onClick = null, disabled = false }) => {
  return (
    <Tooltip title="Edit">
      <Button
        shape="circle"
        type="link"
        icon={<EditOutlined />}
        onClick={onClick}
        disabled={disabled}
      />
    </Tooltip>
  );
};

export default EditItemIcon;
