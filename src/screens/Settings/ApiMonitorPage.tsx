import React from 'react';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';

export const ApiMonitorPage: React.FC = () => {
  return (
    <BodyPageLayout title="API Monitor">
      <div className="p-4">
        <p className="text-muted">API monitoring tools will be implemented here.</p>
      </div>
    </BodyPageLayout>
  );
};
