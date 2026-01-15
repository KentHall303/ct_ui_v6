import React from "react";
import { BodyPageLayout } from "../../components/layout/BodyPageLayout/BodyPageLayout";
import { PipelineByType } from "./PipelineByType";

export default function PipelineEmployeePage() {
  return (
    <BodyPageLayout>
      <PipelineByType
        contactType="Employee"
        title="Pipeline - Employee"
      />
    </BodyPageLayout>
  );
}
