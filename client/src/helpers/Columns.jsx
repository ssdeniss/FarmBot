import React from 'react';
import { Badge, Typography } from 'antd';

import dayjs from 'dayjs';

import {
  filterBool,
  filterDictionary,
  filterText,
  filterDate,
} from '../hooks/useDatasource';

const Column = {
  text: (
    key,
    title,
    {
      filter = false,
      sort = true,
      width = 200,
      fixed,
      toUpperCase = true,
    } = {},
  ) => ({
    title,
    key,
    width,
    dataIndex: key,
    sorter: sort,
    fixed,
    ...(filter ? filterText({ title }) : {}),
    render: (value) =>
      value && toUpperCase && typeof value.toUpperCase === 'function'
        ? value.toUpperCase()
        : value,
  }),
  label: (key, title, { sort = true, width = 200, fixed } = {}) => ({
    title,
    key,
    width,
    dataIndex: key,
    sorter: sort,
    fixed,
    render: (value) => <Typography.Text>{value}</Typography.Text>,
  }),

  bool: (
    key,
    title,
    {
      filter = false,
      sort = true,
      width = 100,
      inverted = false,
      labels = ['All', 'Yes', 'No', 'Unknown'],
    } = {},
  ) => ({
    title,
    key,
    width,
    dataIndex: key,
    sorter: sort,
    ...(filter ? filterBool({ title, labels }) : {}),
    render: (value) => (
      <>
        {
          // eslint-disable-next-line eqeqeq
          value == undefined ? (
            <Badge color="grey" text={labels[3]} />
          ) : (
            <Badge
              color={!(value === inverted) ? 'green' : 'red'}
              text={value ? labels[1] : labels[2]}
            />
          )
        }
      </>
    ),
  }),

  date: (
    key,
    title,
    {
      filter = false,
      sort = true,
      width = 200,
      fixed,
      format = 'YYYY-MM-DD',
    } = {},
  ) => ({
    title,
    key,
    width,
    dataIndex: key,
    sorter: sort,
    fixed,
    ...(filter ? filterDate({ title }) : {}),
    render: (value) => (value ? dayjs(value).format(format) : ''),
  }),

  dictionary: (
    key,
    title,
    dictionary,
    {
      filter = false,
      sort = false,
      width = 100,
      dictKey = 'id',
      dictLabel = 'name',
    } = {},
  ) => ({
    title,
    key,
    width,
    dataIndex: key,
    sorter: sort,
    ...(filter
      ? filterDictionary({ title, dictionary, dictKey, dictLabel })
      : {}),
    render: (value) => {
      const record = dictionary?.content?.find(
        (entry) => entry[dictKey] === value,
      );
      if (!record) return value;
      if (typeof dictLabel === 'function') return dictLabel(record);
      return record[dictLabel];
    },
  }),

  actions: (title, actions, { width = 110 } = {}) => ({
    title,
    key: '__actions',
    width,
    dataIndex: '__actions',
    fixed: 'right',
    render: (_, record, index) => (
      <span style={{ textAlign: 'right' }}>{actions(record, index)}</span>
    ),
  }),

  other: (
    key,
    title,
    render,
    { filter = false, sort = true, width = 200, fixed } = {},
  ) => ({
    title,
    key,
    width,

    dataIndex: key,
    sorter: sort,
    fixed,
    ...(filter ? filterText({ title }) : {}),
    render: typeof render === 'function' ? render : () => {},
  }),
};

export default Column;
