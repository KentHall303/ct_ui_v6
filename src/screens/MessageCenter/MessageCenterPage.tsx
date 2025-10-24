import React from "react";
import { BodyLayout } from "../../components/layout/BodyLayout/BodyLayout";
import { MessageCenter } from "./MessageCenter";

export const MessageCenterPage = (): JSX.Element => {
  return (
    <BodyLayout>
      <MessageCenter />
    </BodyLayout>
  );
};
