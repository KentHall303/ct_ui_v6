import React from 'react';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';

export const AccountPage: React.FC = () => {
  return (
    <BodyPageLayout title="Account">
      <div className="p-4">
        <p className="text-muted">Account settings will be implemented here.</p>
      </div>
    </BodyPageLayout>
  );
};
