import React from "react";
import { BodyPageLayout } from "../../components/layout/BodyPageLayout/BodyPageLayout";
import { ContactsByType } from "./ContactsByType";

export default function ContactsVendorPage() {
  return (
    <BodyPageLayout>
      <ContactsByType
        contactType="Vendor"
        title="Contacts - Vendor"
        newButtonLabel="New Vendor"
      />
    </BodyPageLayout>
  );
}
