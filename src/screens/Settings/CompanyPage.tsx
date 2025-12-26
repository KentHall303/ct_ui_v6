import React from 'react';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';

export const CompanyPage: React.FC = () => {
  return (
    <BodyPageLayout title="Company">
      <div className="p-4">
        <p className="text-muted">Company settings will be implemented here.</p>
      </div>
    </BodyPageLayout>
  );
};
