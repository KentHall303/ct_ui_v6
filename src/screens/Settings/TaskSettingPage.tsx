import React from "react";
import { BodyLayout } from "../../components/layout/BodyLayout/BodyLayout";
import { TaskSetting } from "./TaskSetting";

export const TaskSettingPage = (): JSX.Element => {
  return (
    <BodyLayout>
      <TaskSetting />
    </BodyLayout>
  );
};
