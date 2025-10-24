import React from "react";
import { BodyLayout } from "../../components/layout/BodyLayout/BodyLayout";
import { PipelineClient } from "./PipelineClient";

export const PipelineClientPage: React.FC = () => {
  return (
    <BodyLayout>
      <div
        className="d-flex flex-column h-100 overflow-hidden"
        style={{ minHeight: 0 }}
      >
        <PipelineClient />
      </div>
    </BodyLayout>
  );
};
