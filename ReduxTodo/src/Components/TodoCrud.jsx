// MyTable.jsx
import React, { useState } from "react";
import { Select, Table, Tag } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeTask } from "../redux/Actions";


// Styled Components

const TableWrapper = styled.div`
  width: 1200px;
  margin: 1px auto;
`;

const SelectInput = styled(Select)`
  width: 20%;
  margin-bottom: 10px;
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
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
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleEdit = (record) => {
    console.log("Edit clicked:", record);
    // You can open a modal or form to edit
  };

  const handleDelete = (record) => {
    console.log(record);
    dispatch(removeTask(record.id));
  };

  const filteredTasks =
    selectedStatus === "all"
      ? allTasks
      : allTasks.filter((task) => task.status === selectedStatus);

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
      render: (status) => <Tag>{status.toUpperCase()}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <ActionWrapper>
          <EditIcon onClick={() => handleEdit(record)} />
          <DeleteIcon onClick={() => handleDelete(record)} />
        </ActionWrapper>
      ),
    },
  ];

  return (
    <TableWrapper>
      <SelectInput
        value={selectedStatus}
        onChange={(value) => setSelectedStatus(value)}
        options={[
          { value: "all", label: "All" },
          { value: "todo", label: "Todo" },
          { value: "progress", label: "In Progress" },
          { value: "complete", label: "Complete" },
        ]}
      />
      <Table dataSource={filteredTasks} columns={columns} pagination={false} />
    </TableWrapper>
  );
};

export default TodoCrud;
