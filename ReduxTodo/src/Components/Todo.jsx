import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/Actions";

const FormContainer = styled.div`
  width: 800px;
  margin: 20px auto;
  padding: 24px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 1px auto;
  gap: 16px;
  width: 50%;
`;

const SelectInput = styled(Select)`
  width: 100%;
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 16px;
  & > .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const Todo = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = (submission) => {
    const { date, ...rest } = submission;

    const formattedDate = date.format("D-M-YYYY");

    const taskData = {
      id: Date.now(),
      ...rest,
      date: formattedDate,
    };

    dispatch(addTask(taskData));
    // console.log("Submitted:", taskData);
    form.resetFields();
  };

  return (
    <FormContainer>
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          status: "todo",
        }}
      >
        <RowWrapper>
          <Form.Item label="Title" name="title">
            <Input placeholder="Enter title" />
          </Form.Item>
        </RowWrapper>

        <RowWrapper>
          <Form.Item label="Description" name="description">
            <Input placeholder="Enter description" />
          </Form.Item>
        </RowWrapper>
        <RowWrapper>
          <Form.Item label="status" name="status">
            <SelectInput
              options={[
                { value: "todo", label: "Todo" },
                { value: "progress", label: "In Progress" },
                { value: "complete", label: "Complete" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Date" name="date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </RowWrapper>
        <Button htmlType="submit">Add Task</Button>
      </StyledForm>
    </FormContainer>
  );
};

export default Todo;
