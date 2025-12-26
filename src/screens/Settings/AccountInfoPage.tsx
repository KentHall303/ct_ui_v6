import React from 'react';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';

export const AccountInfoPage: React.FC = () => {
  return (
    <BodyPageLayout title="Account Info">
      <div className="p-4">
        <p className="text-muted">Account info settings will be implemented here.</p>
      </div>
    </BodyPageLayout>
  );
};
