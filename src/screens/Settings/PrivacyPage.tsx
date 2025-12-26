import React from 'react';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';

export const PrivacyPage: React.FC = () => {
  return (
    <BodyPageLayout title="Privacy">
      <div className="p-4">
        <p className="text-muted">Privacy settings will be implemented here.</p>
      </div>
    </BodyPageLayout>
  );
};
