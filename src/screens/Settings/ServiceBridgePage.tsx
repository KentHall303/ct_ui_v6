import React from "react";
import { BodyLayout } from "../../components/layout/BodyLayout/BodyLayout";
import { ServiceBridge } from "./ServiceBridge";

export const ServiceBridgePage = (): JSX.Element => {
  return (
    <BodyLayout>
      <ServiceBridge />
    </BodyLayout>
  );
};
