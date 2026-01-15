import React from "react";
import { BodyPageLayout } from "../../components/layout/BodyPageLayout/BodyPageLayout";
import { ContactsByType } from "./ContactsByType";

export default function ContactsPartnerPage() {
  return (
    <BodyPageLayout>
      <ContactsByType
        contactType="Partner"
        title="Contacts - Partner"
        newButtonLabel="New Partner"
      />
    </BodyPageLayout>
  );
}
