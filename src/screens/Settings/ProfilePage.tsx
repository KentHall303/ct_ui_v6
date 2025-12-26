import React from 'react';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';

export const ProfilePage: React.FC = () => {
  return (
    <BodyPageLayout title="Profile">
      <div className="p-4">
        <p className="text-muted">Profile settings will be implemented here.</p>
      </div>
    </BodyPageLayout>
  );
};
