import { Button, Col, Form, Input, Row, DatePicker, Select } from "antd";
import React from "react";
import moment from "moment";
import { TaskDetail } from "../interface";
import { v4 as uuidv4 } from "uuid";
import type { DatePickerProps } from "antd";
import { useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

interface IProps {
  detail?: TaskDetail;
  submit: (value: TaskDetail) => void;
}

interface TaskDetailForm {
  name: string;
  date: string;
  priority: string;
  description: string;
}

const FormTask = ({ detail, submit }: IProps) => {
  const [dates, setDate] = useState(moment()?.toString() || "");
  const [form] = Form.useForm();

  const onFinish = (values: TaskDetailForm) => {
    let myuuid = uuidv4();
    submit({
      ...values,
      id: detail?.id || myuuid.toString(),
      date: dates,
      priority: form.getFieldValue("priority") || "normal",
    });
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    const value = date?.toString() || "";
    setDate(value);
  };

  return (
    <div>
      <Form
        form={form}
        style={{ padding: 15 }}
        initialValues={detail}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name task!" }]}
        >
          <Input placeholder="add new task..." />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description task!" },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Due date"
              required
              style={{ paddingRight: "15%" }}
            >
              <DatePicker
                style={{ width: "100%" }}
                defaultValue={moment(detail?.date) || moment()}
                format={"DD-MMM-YYYY"}
                onChange={onChangeDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Priority"
              name="priority"
              required
              initialValue={detail?.priority || "normal"}
              style={{ paddingLeft: "10%" }}
            >
              <Select style={{ width: "100%" }}>
                <Option value="low">low</Option>
                <Option value="normal ">normal</Option>
                <Option value="high">high</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
            backgroundColor: "#0cad0cf0",
            borderColor: "#0cad0cf0",
            borderRadius: 5,
          }}
        >
          {detail?.id ? "Update" : "Add"}
        </Button>
      </Form>
    </div>
  );
};

export default FormTask;
