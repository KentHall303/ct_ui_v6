import React from "react";
import { BodyPageLayout } from "../../components/layout/BodyPageLayout/BodyPageLayout";
import { PipelineByType } from "./PipelineByType";

export default function PipelinePartnerPage() {
  return (
    <BodyPageLayout>
      <PipelineByType
        contactType="Partner"
        title="Pipeline - Partner"
      />
    </BodyPageLayout>
  );
}
