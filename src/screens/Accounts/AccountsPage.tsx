import React from "react";
import { BodyLayout } from "../../components/layout/BodyLayout/BodyLayout";
import { Accounts } from "./Accounts";

export const AccountsPage = (): JSX.Element => {
  return (
    <BodyLayout>
      <Accounts />
    </BodyLayout>
  );
};
