import React from 'react';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';

export const SecurityPage: React.FC = () => {
  return (
    <BodyPageLayout title="Security">
      <div className="p-4">
        <p className="text-muted">Security settings will be implemented here.</p>
      </div>
    </BodyPageLayout>
  );
};
