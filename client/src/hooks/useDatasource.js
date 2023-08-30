import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useRef,
} from 'react';
import {
  DatePicker,
  Button,
  Checkbox,
  Input,
  Radio,
  Space,
  Typography,
  Select,
  notification,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useScrollToTop from './useScrollToTop';

const ACTION_LOADING = Symbol('ACTION_LOADING');
const ACTION_LOADED = Symbol('ACTION_LOADED');
const ACTION_FAILED = Symbol('ACTION_FAILED');

const initialState = {
  content: [],
  pagination: {
    current: 1,
    pageSize: 20,
    total: 0,
  },

  criterias: null,
  sort: null,

  loading: false,
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_LOADING:
      return {
        ...state,

        criterias: action.payload.criterias || state.criterias,
        sort: action.payload.sort || state.sort,
        pagination: {
          showSizeChanger: false,
          ...state.pagination,
          current:
            action?.payload?.pagination?.current || state?.pagination?.current,
          pageSize:
            action?.payload?.pagination?.pageSize ||
            state?.pagination?.pageSize,
        },

        loading: true,
        error: false,
      };

    case ACTION_LOADED:
      return {
        ...state,
        content: action.payload.content,
        pagination: {
          showSizeChanger: true,
          current: action.payload.pageNumber,
          pageSize: action.payload.pageSize,
          total: action.payload.totalElements,
          pageSizeOptions: [20, 50, 100, 200],
          defaultPageSize: 20,
        },
        error: false,
        loading: false,
      };

    case ACTION_FAILED:
      return {
        ...initialState,
        error: true,
      };

    default:
      return state;
  }
};

const reduceFilters = (filters) =>
  Object.keys(filters)
    .filter((key) => Array.isArray(filters[key]) && filters[key].length > 0)
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: filters[key],
      }),
      {},
    );

const reduceSorter = (sorter) => {
  const { order, field } = sorter;

  if (!order) {
    return null;
  }
  return [field, order === 'ascend' ? 'asc' : 'desc'];
};

const FilterDialog = ({
  title,
  searchTitle,
  resetTitle,
  confirm,
  clearFilters,
  children,
}) => (
  <div style={{ padding: 16, paddingTop: 16 }}>
    <Typography.Paragraph>{title}</Typography.Paragraph>
    {children}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '20px',
      }}
    >
      <Button
        onClick={() => {
          clearFilters();
          confirm();
        }}
      >
        {resetTitle}
      </Button>
      <Button
        type="primary"
        onClick={() => confirm()}
        icon={<SearchOutlined />}
      >
        {searchTitle}
      </Button>
    </div>
  </div>
);

const FilterIcon = (filtered) => (
  <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
);

export const filterText = ({
  title = 'Filtrează',
  searchTitle = 'Caută',
  resetTitle = 'Curăță',
}) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <FilterDialog
      title={title}
      searchTitle={searchTitle}
      resetTitle={resetTitle}
      confirm={confirm}
      clearFilters={clearFilters}
    >
      <Input
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        autoFocus
        allowClear
        onPressEnter={() => confirm()}
        style={{ marginBottom: 8 }}
      />
    </FilterDialog>
  ),
  filterIcon: FilterIcon,
});

export const filterBool = ({
  title = 'Filter',
  searchTitle = 'Search',
  resetTitle = 'Reset',
  labels = ['All', 'Yes', 'No'],
}) => {
  const options = [
    { label: labels[0], value: undefined },
    { label: labels[1], value: 'true' },
    { label: labels[2], value: 'false' },
  ];

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <FilterDialog
        title={title}
        searchTitle={searchTitle}
        resetTitle={resetTitle}
        confirm={confirm}
        clearFilters={clearFilters}
      >
        <Radio.Group
          value={selectedKeys[0]}
          options={options}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
        />
      </FilterDialog>
    ),
    filterIcon: FilterIcon,
  };
};

export const filterDictionary = ({
  title = 'Filter',
  searchTitle = 'Search',
  resetTitle = 'Reset',
  dictionary,
  dictKey,
  dictLabel,
}) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <FilterDialog
      title={title}
      searchTitle={searchTitle}
      resetTitle={resetTitle}
      confirm={confirm}
      clearFilters={clearFilters}
    >
      {dictionary.content.length < 10 ? (
        <>
          <Space direction="vertical">
            {dictionary.content.map((entry) => (
              <Checkbox
                key={entry[dictKey]}
                onChange={() =>
                  setSelectedKeys(
                    selectedKeys.includes(entry[dictKey])
                      ? selectedKeys.filter((key) => key !== entry[dictKey])
                      : [...selectedKeys, entry[dictKey]],
                  )
                }
              >
                {(typeof dictLabel === 'function'
                  ? dictLabel(entry)
                  : entry[dictLabel]) || entry[dictKey]}
              </Checkbox>
            ))}
          </Space>
        </>
      ) : (
        <Select
          style={{ minWidth: '100%' }}
          allowClear
          mode="multiple"
          onChange={(value) => {
            setSelectedKeys(value);
          }}
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) !== -1
          }
        >
          {dictionary.content.map((option) => (
            <Select.Option key={option.id} value={option.id}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      )}
    </FilterDialog>
  ),
  filterIcon: FilterIcon,
});

export const filterDate = ({
  title = 'Filter',
  searchTitle = 'Search',
  resetTitle = 'Reset',
}) => ({
  filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
    <FilterDateWrapper
      title={title}
      searchTitle={searchTitle}
      resetTitle={resetTitle}
      setSelectedKeys={setSelectedKeys}
      clearFilters={clearFilters}
      confirm={confirm}
    />
  ),
  filterIcon: FilterIcon,
});

const DATE_START = '1900-01-01';
const DATE_END = '3000-01-01';
const EMPTY_DATE_RANGE = [null, null];

const FilterDateWrapper = ({
  title,
  searchTitle,
  resetTitle,
  setSelectedKeys,
  confirm,
  clearFilters,
}) => {
  const [value, setValue] = useState(EMPTY_DATE_RANGE);

  const onChange = useCallback(
    ([start, end]) => {
      if (!start && !end) {
        setValue(EMPTY_DATE_RANGE);
        setSelectedKeys(null);
      } else {
        setValue([start, end]);
        setSelectedKeys([
          {
            from: start ? start.toJSON() : DATE_START,
            to: end ? end.toJSON() : DATE_END,
          },
        ]);
      }
    },
    [setSelectedKeys],
  );

  const onClearFilters = useCallback(() => {
    clearFilters();
    setValue(EMPTY_DATE_RANGE);
    searchTitle();
    confirm();
  }, [clearFilters, confirm, searchTitle]);

  return (
    <FilterDialog
      title={title}
      searchTitle={searchTitle}
      resetTitle={resetTitle}
      confirm={confirm}
      clearFilters={onClearFilters}
    >
      <DatePicker.RangePicker
        allowClear={false}
        allowEmpty={[true, true]}
        format="DD.MM.YYYY"
        style={{ width: '18rem' }}
        value={value}
        onChange={onChange}
      />
    </FilterDialog>
  );
};
export default function useDatasource(
  fetcher,
  options = {
    pagination: {},
    showNotification: false,
    allowFetcher: true,
  },
) {
  const safeguard = useRef(0);

  const { pagination: optPagination } = options;
  const { allowFetcher } = options;
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    pagination: {
      ...initialState.pagination,
      ...optPagination,
    },
  });

  const reload = useCallback(() => {
    dispatch({
      type: ACTION_LOADING,
      payload: {},
    });
  }, []);

  const handleChange = useCallback((pagination, filters, sorter) => {
    dispatch({
      type: ACTION_LOADING,
      payload: {
        criterias: reduceFilters(filters),
        sort: reduceSorter(sorter),
        pagination,
      },
    });
  }, []);
  useScrollToTop();
  useEffect(() => {
    dispatch({ type: ACTION_LOADING, payload: {} });
  }, []);

  useEffect(() => {
    if (state.loading) {
      safeguard.current += 1;
      const pointintime = safeguard.current;

      const {
        criterias,
        sort,
        pagination: { current: pageNumber, pageSize },
      } = state;
      if (allowFetcher)
        fetcher({
          criterias,
          sort,
          pageNumber,
          pageSize,
        })
          .then((res) => {
            if (pointintime === safeguard.current) {
              if (options.showNotification) {
                if (res.totalElements === 0) {
                  notification.warning({
                    message: 'Nu au fost găsite date.',
                  });
                } else {
                  notification.success({
                    message: 'Datele au fost descărcate cu succes.',
                    duration: 3,
                  });
                }
              }
              dispatch({ type: ACTION_LOADED, payload: res });
            }
          })
          .catch(() => {
            if (pointintime === safeguard.current) {
              if (options.showNotification) {
                notification.error({
                  message: 'Nu au putut fi descărcate date.',
                });
              }
              dispatch({ type: ACTION_FAILED });
            }
          });
    }
    return () => null;
  }, [fetcher, state, options, allowFetcher]);

  return {
    content: state.content,
    loading: state.loading,
    invalid: state.error,
    pagination: state.pagination,

    filter: state.filter,
    sort: state.sort,

    handleChange,
    reload,
  };
}
