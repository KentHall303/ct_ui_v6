import React from 'react';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';

export const PaymentMethodsPage: React.FC = () => {
  return (
    <BodyPageLayout title="Payment Methods">
      <div className="p-4">
        <p className="text-muted">Payment methods settings will be implemented here.</p>
      </div>
    </BodyPageLayout>
  );
};
