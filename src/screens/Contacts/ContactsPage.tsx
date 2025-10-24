import React from "react";
import { BodyLayout } from "../../components/layout/BodyLayout/BodyLayout";
import { Contacts } from "./Contacts";

export const ContactsPage = (): JSX.Element => {
  return (
    <BodyLayout>
      <Contacts />
    </BodyLayout>
  );
};
