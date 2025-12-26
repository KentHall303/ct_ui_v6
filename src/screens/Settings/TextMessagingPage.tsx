import React from 'react';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';

export const TextMessagingPage: React.FC = () => {
  return (
    <BodyPageLayout title="Text Messaging">
      <div className="p-4">
        <p className="text-muted">Text messaging settings will be implemented here.</p>
      </div>
    </BodyPageLayout>
  );
};
