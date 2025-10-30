import React from 'react';
import { RouteObject } from 'react-router-dom';

const AccountsPage = React.lazy(() => import('./screens/Accounts/AccountsPage').then(m => ({ default: m.AccountsPage })));
const PipelineClientPage = React.lazy(() => import('./screens/Pipeline/PipelineClientPage').then(m => ({ default: m.PipelineClientPage })));
const ContactsPage = React.lazy(() => import('./screens/Contacts/ContactsPage').then(m => ({ default: m.ContactsPage })));
const ContactsEmployeePage = React.lazy(() => import('./screens/Contacts/ContactsEmployeePage').then(m => ({ default: m.ContactsEmployeePage })));
const Jobs = React.lazy(() => import('./screens/Jobs/Jobs').then(m => ({ default: m.Jobs })));
const CalendarPage = React.lazy(() => import('./screens/Calendar/CalendarPage').then(m => ({ default: m.CalendarPage })));
const MessageCenterPage = React.lazy(() => import('./screens/MessageCenter/MessageCenterPage').then(m => ({ default: m.MessageCenterPage })));
const Typology = React.lazy(() => import('./screens/Typology/Typology').then(m => ({ default: m.Typology })));
const FormExamples = React.lazy(() => import('./screens/FormExamples/FormExamples').then(m => ({ default: m.FormExamples })));
const BootstrapComponents = React.lazy(() => import('./screens/BootstrapComponents/BootstrapComponents').then(m => ({ default: m.BootstrapComponents })));
const ContactProfilePage = React.lazy(() => import('./screens/DesignHub/ContactProfilePage').then(m => ({ default: m.ContactProfilePage })));
const ContactProfileModal3Page = React.lazy(() => import('./screens/DesignHub/ContactProfileModal3Page').then(m => ({ default: m.ContactProfileModal3Page })));
const ContactProfileModal3DirectPage = React.lazy(() => import('./screens/DesignHub/ContactProfileModal3DirectPage').then(m => ({ default: m.ContactProfileModal3DirectPage })));
const MeetingManagementPage = React.lazy(() => import('./screens/DesignHub/MeetingManagementPage').then(m => ({ default: m.MeetingManagementPage })));
const ProposalSettingsPage = React.lazy(() => import('./screens/DesignHub/ProposalSettingsPage').then(m => ({ default: m.ProposalSettingsPage })));
const ProposalModalPage = React.lazy(() => import('./screens/DesignHub/ProposalModalPage').then(m => ({ default: m.ProposalModalPage })));
const TableStandardsPage = React.lazy(() => import('./screens/DesignHub/TableStandardsPage').then(m => ({ default: m.TableStandardsPage })));

const PlaceholderPage: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PlaceholderPage title="Dashboard" description="Dashboard content will be implemented here." />
  },
  {
    path: '/dashboard',
    element: <PlaceholderPage title="Dashboard" description="Dashboard content will be implemented here." />
  },
  {
    path: '/accounts',
    element: <AccountsPage />
  },
  {
    path: '/pipeline',
    element: <PlaceholderPage title="Pipeline" description="Pipeline content will be implemented here." />
  },
  {
    path: '/pipeline/client',
    element: <PipelineClientPage />
  },
  {
    path: '/pipeline/employee',
    element: <PlaceholderPage title="Pipeline - Employee" description="Pipeline employee content will be implemented here." />
  },
  {
    path: '/pipeline/partner',
    element: <PlaceholderPage title="Pipeline - Partner" description="Pipeline partner content will be implemented here." />
  },
  {
    path: '/pipeline/vendor',
    element: <PlaceholderPage title="Pipeline - Vendor" description="Pipeline vendor content will be implemented here." />
  },
  {
    path: '/pipeline/new-order',
    element: <PlaceholderPage title="Pipeline - New Order" description="Pipeline new order content will be implemented here." />
  },
  {
    path: '/contacts',
    element: <PlaceholderPage title="Contacts" description="Contacts content will be implemented here." />
  },
  {
    path: '/contacts/clients',
    element: <ContactsPage />
  },
  {
    path: '/contacts/employee',
    element: <ContactsEmployeePage />
  },
  {
    path: '/contacts/partner',
    element: <PlaceholderPage title="Contacts - Partner" description="Partner contacts will be implemented here." />
  },
  {
    path: '/contacts/vendor',
    element: <PlaceholderPage title="Contacts - Vendor" description="Vendor contacts will be implemented here." />
  },
  {
    path: '/contacts/new-other',
    element: <PlaceholderPage title="Contacts - New Other" description="New other contacts will be implemented here." />
  },
  {
    path: '/contacts/all',
    element: <PlaceholderPage title="All Contacts" description="All contacts will be implemented here." />
  },
  {
    path: '/contacts/archived',
    element: <PlaceholderPage title="Archived Contacts" description="Archived contacts will be implemented here." />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/calendar',
    element: <CalendarPage />
  },
  {
    path: '/message-center',
    element: <MessageCenterPage />
  },
  {
    path: '/action-plans',
    element: <PlaceholderPage title="Action Plans" description="Action Plans content will be implemented here." />
  },
  {
    path: '/action-plans/connection',
    element: <PlaceholderPage title="Connection Plans" description="Connection Plans content will be implemented here." />
  },
  {
    path: '/action-plans/conversion',
    element: <PlaceholderPage title="Conversion Plans" description="Conversion Plans content will be implemented here." />
  },
  {
    path: '/action-plans/retention',
    element: <PlaceholderPage title="Retention Plans" description="Retention Plans content will be implemented here." />
  },
  {
    path: '/templates',
    element: <PlaceholderPage title="Templates" description="Templates content will be implemented here." />
  },
  {
    path: '/design-hub',
    element: <Typology />
  },
  {
    path: '/design-hub/announcements',
    element: <PlaceholderPage title="Announcements" description="Announcements content will be implemented here." />
  },
  {
    path: '/design-hub/hosted-pages',
    element: <PlaceholderPage title="Hosted Pages" description="Hosted Pages content will be implemented here." />
  },
  {
    path: '/design-hub/log-codes',
    element: <PlaceholderPage title="Log Codes" description="Log Codes content will be implemented here." />
  },
  {
    path: '/design-hub/pipeline',
    element: <PlaceholderPage title="Design Hub Pipeline" description="Design Hub Pipeline content will be implemented here." />
  },
  {
    path: '/design-hub/proposal',
    element: <ProposalSettingsPage />
  },
  {
    path: '/design-hub/proposal-modal',
    element: <ProposalModalPage />
  },
  {
    path: '/design-hub/table-standards',
    element: <TableStandardsPage />
  },
  {
    path: '/design-hub/triggers',
    element: <PlaceholderPage title="Triggers" description="Triggers content will be implemented here." />
  },
  {
    path: '/design-hub/typography',
    element: <Typology />
  },
  {
    path: '/design-hub/form-examples',
    element: <FormExamples />
  },
  {
    path: '/design-hub/bootstrap-components',
    element: <BootstrapComponents />
  },
  {
    path: '/design-hub/contact-profile-modal-3',
    element: <ContactProfileModal3DirectPage />
  },
  {
    path: '/design-hub/meeting-management',
    element: <MeetingManagementPage />
  },
  {
    path: '/settings',
    element: <PlaceholderPage title="Settings" description="Settings content will be implemented here." />
  },
  {
    path: '/settings/chart-builder',
    element: <PlaceholderPage title="Chart Builder" description="Chart Builder content will be implemented here." />
  },
  {
    path: '/settings/api-monitor',
    element: <PlaceholderPage title="API Monitor" description="API Monitor content will be implemented here." />
  },
  {
    path: '/settings/webhook-monitor',
    element: <PlaceholderPage title="Webhook Monitor" description="Webhook Monitor content will be implemented here." />
  }
];
