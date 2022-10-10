import React from "react";
import { Col, Row, Input, Button } from "antd";
import "antd/dist/antd.min.css";
import FormTask from "../src/Element/FormTask";
import DetailTasks from "./Origamis/TaskDetail";
import { TaskDetail } from "./interface";
import { useEffect, useState } from "react";

const { Search } = Input;

const App = () => {
  const [dataAll, setDataAll] = useState<TaskDetail[]>([]);
  const [data, setData] = useState<TaskDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<string[]>([] as string[]);

  const onSearch = (value: string) => {
    setLoading(true);
    if (value) {
      const result = dataAll?.filter((item: TaskDetail) =>
        item.name.includes(value)
      );
      setData(result);
    } else {
      setData(dataAll);
    }
    setLoading(false);
  };

  const addTask = (value: TaskDetail) => {
    const tasks = [...dataAll, value];
    setDataAll(tasks);
    updateLocalStorage(tasks);
  };

  const updateLocalStorage = (values: TaskDetail[]) => {
    window.localStorage.removeItem("dataTask");
    window.localStorage.setItem("dataTask", JSON.stringify(values));
    setDataAll(values);
  };

  const update = (detailTask: TaskDetail) => {
    const result = dataAll?.filter(
      (item: TaskDetail) => item.id !== detailTask.id
    );
    updateLocalStorage([...result, detailTask]);
    setDataAll([...result, detailTask]);
  };

  const remove = (id: string) => {
    const result = dataAll?.filter((item: TaskDetail) => item.id !== id);
    updateLocalStorage(result);
    setDataAll(result);
  };

  const removeTasks = () => {
    const result = dataAll?.filter(
      (item: TaskDetail) => !itemSelected.includes(item.id)
    );
    updateLocalStorage(result);
    setDataAll(result);
  };

  const onSelectItems = (idSelected: string) => {
    if (itemSelected.includes(idSelected)) {
      setItemSelected(itemSelected.filter((id: string) => id !== idSelected));
    } else setItemSelected([...itemSelected, idSelected]);
    console.log(idSelected);
  };

  useEffect(() => {
    setLoading(true);
    const dataTasks =
      JSON.parse(window.localStorage.getItem("dataTask") || "[]") ||
      ([] as TaskDetail[]);
    setDataAll(dataTasks);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    setData(dataAll);
    setLoading(false);
  }, [dataAll]);

  return (
    <Row>
      <Col span={8} style={{ border: "1px solid" }}>
        <strong
          style={{
            display: "inline-block",
            width: "100%",
            marginLeft: "46%",
            marginTop: 20,
          }}
        >
          NEW TASK
        </strong>
        <div style={{ padding: 20, paddingTop: 20 }}>
          <FormTask submit={addTask} />
        </div>
      </Col>
      <Col span={16} style={{ border: "1px solid" }}>
        <strong
          style={{
            display: "inline-block",
            width: "100%",
            marginLeft: "46%",
            marginTop: 20,
          }}
        >
          TO DO LIST
        </strong>
        <div style={{ padding: 20, paddingTop: 20 }}>
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ paddingBottom: 20 }}
          />
          {loading ? (
            <div className="loader"></div>
          ) : (
            <div style={{ overflow: "scroll", height: "70vh" }}>
              {data?.map((detail) => (
                <div style={{ paddingTop: 15 }}>
                  <DetailTasks
                    updateDetail={update}
                    detail={detail}
                    remove={remove}
                    onCheck={onSelectItems}
                    listCurrentSelected={data
                      .map((item: TaskDetail) => item.id)
                      .filter((id: string) => itemSelected.includes(id))}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {itemSelected.length ? (
          <div
            style={{
              display: "flex",
              alignContent: "center",
              flexWrap: "wrap",
              alignItems: "baseline",
              height: 120,
              borderWidth: 1,
            }}
          >
            <div> Bulk Action: </div>
            <Button
              type="primary"
              style={{
                marginLeft: "auto",
                marginRight: "3%",
                width: "15%",
                borderRadius: 5,
              }}
            >
              Done
            </Button>
            <Button
              type="primary"
              style={{
                marginRight: "5%",
                width: "15%",
                backgroundColor: "#c70a0a",
                borderColor: "#c70a0a",
                borderRadius: 5,
              }}
              onClick={() => removeTasks()}
            >
              Remove
            </Button>
          </div>
        ) : null}
      </Col>
    </Row>
  );
};

export default App;
