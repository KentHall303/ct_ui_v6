import React from "react";
import { BodyLayout } from "../../components/layout/BodyLayout/BodyLayout";
import { Users } from "./Users";

export const UsersPage = (): JSX.Element => {
  return (
    <BodyLayout>
      <Users />
    </BodyLayout>
  );
};
