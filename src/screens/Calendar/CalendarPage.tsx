import React from "react";
import { BodyLayout } from "../../components/layout/BodyLayout/BodyLayout";
import { Calendar } from "./Calendar";

export const CalendarPage = (): JSX.Element => {
  return (
    <BodyLayout>
      <Calendar />
    </BodyLayout>
  );
};
