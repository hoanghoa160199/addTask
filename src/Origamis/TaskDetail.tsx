import React from "react";
import FormTask from "../Element/FormTask";
import { Button, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { TaskDetail } from "../interface";

interface IProps {
  updateDetail: (values: TaskDetail) => void;
  detail: TaskDetail;
  remove: (id: string) => void;
  onCheck: (id: string) => void;
  listCurrentSelected: string[];
}

const DetailTasks = ({
  updateDetail,
  detail,
  remove,
  onCheck,
  listCurrentSelected,
}: IProps) => {
  const [showDetail, setShowDetail] = useState(false);
  console.log(listCurrentSelected);

  const updateTask = (values: TaskDetail) => {
    updateDetail(values);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          borderStyle: "solid",
          flexDirection: "row",
          alignContent: "center",
          flexWrap: "wrap",
          alignItems: "baseline",
          height: 70,
          borderWidth: 1,
        }}
      >
        <Checkbox
          style={{ paddingLeft: "2%" }}
          onChange={() => onCheck(detail?.id)}
          checked={listCurrentSelected.includes(detail?.id)}
        >
          {detail?.name}
        </Checkbox>
        <Button
          type="primary"
          style={{
            marginLeft: "auto",
            marginRight: "3%",
            width: "15%",
            backgroundColor: "#1dd3fdfa",
            borderColor: "#1dd3fdfa",
            borderRadius: 5,
          }}
          onClick={() => setShowDetail(!showDetail)}
        >
          Detail
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
          onClick={() => remove(detail.id)}
        >
          Remove
        </Button>
      </div>
      {showDetail && <FormTask detail={detail} submit={updateTask} />}
    </>
  );
};

export default DetailTasks;
