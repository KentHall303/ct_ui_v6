import React from "react";
import { BodyLayout } from "../../components/layout/BodyLayout/BodyLayout";
import { ContactsEmployee } from "./ContactsEmployee";

export const ContactsEmployeePage = (): JSX.Element => {
  return (
    <BodyLayout>
      <ContactsEmployee />
    </BodyLayout>
  );
};
