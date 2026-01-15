import React from "react";
import { ContactsByType } from "./ContactsByType";

export const ContactsEmployeeNew = (): JSX.Element => {
  return (
    <ContactsByType
      contactType="Employee"
      title="Contacts - Employee"
      newButtonLabel="New Employee"
    />
  );
};
