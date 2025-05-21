import React, { useState } from 'react';
import { Table, Input, Form } from 'antd';
import { FiEdit, FiCheck, FiX } from 'react-icons/fi';

const EditableTable = () => {
  const initialData = [
    { key: '1', name: 'John Doe', age: 28 },
    { key: '2', name: 'Jane Smith', age: 32 },
  ];

  const [data, setData] = useState(initialData);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ name: '', age: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      }
    } catch (err) {
      console.log('Validation failed:', err);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
      render: (_, record) => {
        return isEditing(record) ? (
          <Form.Item name="name" style={{ margin: 0 }}>
            <Input />
          </Form.Item>
        ) : (
          record.name
        );
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      editable: true,
      render: (_, record) => {
        return isEditing(record) ? (
          <Form.Item name="age" style={{ margin: 0 }}>
            <Input />
          </Form.Item>
        ) : (
          record.age
        );
      },
    },
    {
      title: 'Action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span style={{ display: 'flex', gap: '10px' }}>
            <FiCheck
              onClick={() => save(record.key)}
              style={{ color: 'green', cursor: 'pointer' }}
            />
            <FiX
              onClick={cancel}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          </span>
        ) : (
          <FiEdit
            onClick={() => edit(record)}
            style={{ cursor: 'pointer' }}
          />
        );
      },
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        dataSource={data}
        columns={columns}
        components={{
          body: {
            cell: ({ children, ...restProps }) => <td {...restProps}>{children}</td>,
          },
        }}
        pagination={false}
      />
    </Form>
  );
};

export default EditableTable;
