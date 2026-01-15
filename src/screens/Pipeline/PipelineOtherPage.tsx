import React from "react";
import { BodyPageLayout } from "../../components/layout/BodyPageLayout/BodyPageLayout";
import { PipelineByType } from "./PipelineByType";

export default function PipelineOtherPage() {
  return (
    <BodyPageLayout>
      <PipelineByType
        contactType="Other"
        title="Pipeline - Other"
      />
    </BodyPageLayout>
  );
}
