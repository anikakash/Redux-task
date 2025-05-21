import React, { useState } from "react";
import { DatePicker, Form, Input, Select, Table, Tag } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, updateTask } from "../redux/Actions";
import dayjs from "dayjs";
import { FiCheck, FiEdit, FiX } from "react-icons/fi";

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

const SaveIcon = styled(FiCheck)`
  color: #3899f3;
  cursor: pointer;
  &:hover {
    color: #008afb;
  }
`

const CancleIcon = styled(FiX)`
  color: #ff4d4f;
  cursor: pointer;
  &:hover {
    color: #ff7875;
  }
`

const TodoCrud = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();

  const isEditing = (record) => record.id === editingKey;
  const handleEdit = (record) => {
    console.log("Edit clicked:", dayjs(record.date));
    form.setFieldsValue({
      title: record.title,
      description: record.description,
      status: record.status,
      date: dayjs(record.date),
    });
    setEditingKey(record.id);
  };

  const handleSave = async(record) =>{
    console.log("From save: ", record);
    try{
      const values = await form.validateFields();
      const updateData = {
        ...record,
        ...values,
        date: values.date ? dayjs(values.date).format("YYYY-MM-DD") : record.date,
      }
      console.log(updateData)
      dispatch(updateTask(updateData.id, updateData))
      setEditingKey("");
    }catch(err){
      console.log("Validation Failed: ", err);
    }
    
  }

  const handleCancel = () => {
  setEditingKey("");
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
      render: (txt, record) => {
        console.log(" - : ", txt);
        console.log("rec: ", record);
        return isEditing(record) ? (
          <Form.Item name="title" style={{ margin: 0 }}>
            <Input />
          </Form.Item>
        ) : (
          record.title
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (txt, record) => {
        console.log(" - : ", txt);
        console.log("rec: ", record);
        return isEditing(record) ? (
          <Form.Item name="description" style={{ margin: 0 }}>
            <Input />
          </Form.Item>
        ) : (
          record.description
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (txt, record) => {
        console.log(" - : ", txt);
        console.log("rec: ", record);
        return isEditing(record) ? (
          <Form.Item name="date" style={{ margin: 0 }}>
            <DatePicker />
          </Form.Item>
        ) : (
          record.date
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) =>
        isEditing(record) ? (
          <Form.Item name="status" style={{ margin: 0 }}>
            <Select
              options={[
                { value: "todo", label: "Todo" },
                { value: "progress", label: "In Progress" },
                { value: "complete", label: "Complete" },
              ]}
            />
          </Form.Item>
        ) : (
          <Tag>{status.toUpperCase()}</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => 
        isEditing(record) ? (
          <ActionWrapper>
            <SaveIcon onClick={()=>handleSave(record)}/>
            <CancleIcon onClick={()=>handleCancel()}/>
          </ActionWrapper>
        ) : (
          (
        <ActionWrapper>
          <EditIcon onClick={() => handleEdit(record)} />
          <DeleteIcon onClick={() => handleDelete(record)} />
        </ActionWrapper>
      )
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
      <Form form={form}>
        <Table
          dataSource={filteredTasks}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      </Form>
    </TableWrapper>
  );
};

export default TodoCrud;
