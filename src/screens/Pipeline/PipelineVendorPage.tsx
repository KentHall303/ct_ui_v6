import React from "react";
import { BodyPageLayout } from "../../components/layout/BodyPageLayout/BodyPageLayout";
import { PipelineByType } from "./PipelineByType";

export default function PipelineVendorPage() {
  return (
    <BodyPageLayout>
      <PipelineByType
        contactType="Vendor"
        title="Pipeline - Vendor"
      />
    </BodyPageLayout>
  );
}
