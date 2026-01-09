import React from 'react';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';

export const AnnouncementsPage: React.FC = () => {
  return (
    <BodyPageLayout title="Announcements">
      <div className="p-4">
        <p className="text-muted">Announcements management will be implemented here.</p>
      </div>
    </BodyPageLayout>
  );
};
