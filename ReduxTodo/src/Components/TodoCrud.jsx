// MyTable.jsx
import React, { useState } from "react";
import { Select, Table, Tag } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { useSelector } from "react-redux";

// Sample Data
const initialData = [
  {
    key: "1",
    title: "First Task",
    description: "This is the first task",
    date: "2025-05-20",
    status: "active",
  },
  {
    key: "2",
    title: "Second Task",
    description: "This is the second task",
    date: "2025-05-21",
    status: "inactive",
  },
];

// Styled Components

const TableWrapper = styled.div`
    width: 1200px;
    margin: 1px auto;
`

const SelectInput = styled(Select)`
  width: 20%;
  margin-bottom: 10px;
`;

const ActionWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const EditIcon = styled(FaEdit)`
  color: #1890ff;
  cursor: pointer;
  &:hover {
    color: #40a9ff;
  }
`;

const DeleteIcon = styled(FaTrash)`
  color: #ff4d4f;
  cursor: pointer;
  &:hover {
    color: #ff7875;
  }
`;

const TodoCrud = () => {
  const allTasks = useSelector((state) => state);
  const [dataSource, setDataSource] = useState(initialData);

  const handleEdit = (record) => {
    console.log("Edit clicked:", record);
    // You can open a modal or form to edit
  };

  const handleDelete = (key) => {
    const filtered = dataSource.filter((item) => item.key !== key);
    setDataSource(filtered);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <ActionWrapper>
          <EditIcon onClick={() => handleEdit(record)} />
          <DeleteIcon onClick={() => handleDelete(record.key)} />
        </ActionWrapper>
      ),
    },
  ];

  return (
    <TableWrapper>
        <SelectInput
              options={[
                { value: "todo", label: "Todo" },
                { value: "progress", label: "In Progress" },
                { value: "complete", label: "Complete" },
              ]}
            />
      <Table dataSource={allTasks} columns={columns} pagination={false}/>;
    </TableWrapper>
  );
};

export default TodoCrud;
