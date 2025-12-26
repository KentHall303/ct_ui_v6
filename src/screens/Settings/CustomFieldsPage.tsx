import React from 'react';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';

export const CustomFieldsPage: React.FC = () => {
  return (
    <BodyPageLayout title="Custom Fields">
      <div className="p-4">
        <p className="text-muted">Custom fields settings will be implemented here.</p>
      </div>
    </BodyPageLayout>
  );
};
