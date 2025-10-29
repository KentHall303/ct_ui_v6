import React from "react";
import { BodyLayout } from "../../components/layout/BodyLayout/BodyLayout";
import { CalendarRedesigned } from "./CalendarRedesigned";

export const CalendarPage = (): JSX.Element => {
  return (
    <BodyLayout>
      <CalendarRedesigned />
    </BodyLayout>
  );
};
