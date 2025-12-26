import React from 'react';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';

export const AppointmentsPage: React.FC = () => {
  return (
    <BodyPageLayout title="Appointments">
      <div className="p-4">
        <p className="text-muted">Appointments settings will be implemented here.</p>
      </div>
    </BodyPageLayout>
  );
};
