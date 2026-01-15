import React from 'react';
import { RouteObject } from 'react-router-dom';

const AccountsPage = React.lazy(() => import('./screens/Accounts/AccountsPage').then(m => ({ default: m.AccountsPage })));
const PipelineClientPage = React.lazy(() => import('./screens/Pipeline/PipelineClientPage').then(m => ({ default: m.PipelineClientPage })));
const PipelineEmployeePage = React.lazy(() => import('./screens/Pipeline/PipelineEmployeePage'));
const PipelinePartnerPage = React.lazy(() => import('./screens/Pipeline/PipelinePartnerPage'));
const PipelineVendorPage = React.lazy(() => import('./screens/Pipeline/PipelineVendorPage'));
const PipelineOtherPage = React.lazy(() => import('./screens/Pipeline/PipelineOtherPage'));
const ContactsPage = React.lazy(() => import('./screens/Contacts/ContactsPage').then(m => ({ default: m.ContactsPage })));
const ContactsEmployeePage = React.lazy(() => import('./screens/Contacts/ContactsEmployeePage').then(m => ({ default: m.ContactsEmployeePage })));
const ContactsAllPage = React.lazy(() => import('./screens/Contacts/ContactsAllPage'));
const ContactsPartnerPage = React.lazy(() => import('./screens/Contacts/ContactsPartnerPage'));
const ContactsVendorPage = React.lazy(() => import('./screens/Contacts/ContactsVendorPage'));
const ContactsOtherPage = React.lazy(() => import('./screens/Contacts/ContactsOtherPage'));
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
const TemplatesPage = React.lazy(() => import('./screens/Templates/TemplatesPage').then(m => ({ default: m.TemplatesPage })));
const EmailTemplatesPage = React.lazy(() => import('./screens/Templates/EmailTemplatesPage').then(m => ({ default: m.EmailTemplatesPage })));
const TaskTemplatesPage = React.lazy(() => import('./screens/Templates/TaskTemplatesPage').then(m => ({ default: m.TaskTemplatesPage })));
const TextTemplatesPage = React.lazy(() => import('./screens/Templates/TextTemplatesPage').then(m => ({ default: m.TextTemplatesPage })));
const ApptInvitesTemplatesPage = React.lazy(() => import('./screens/Templates/ApptInvitesTemplatesPage').then(m => ({ default: m.ApptInvitesTemplatesPage })));
const NotesLogsTemplatesPage = React.lazy(() => import('./screens/Templates/NotesLogsTemplatesPage').then(m => ({ default: m.NotesLogsTemplatesPage })));
const ExportListTemplatesPage = React.lazy(() => import('./screens/Templates/ExportListTemplatesPage').then(m => ({ default: m.ExportListTemplatesPage })));
const DropdownsTemplatesPage = React.lazy(() => import('./screens/Templates/DropdownsTemplatesPage').then(m => ({ default: m.DropdownsTemplatesPage })));
const EmailTemplateModalTestPage = React.lazy(() => import('./screens/Templates/EmailTemplateModalTestPage').then(m => ({ default: m.EmailTemplateModalTestPage })));
const ConnectionPlansPage = React.lazy(() => import('./screens/ActionPlans/ConnectionPlansPage').then(m => ({ default: m.ConnectionPlansPage })));
const ConversionPlansPage = React.lazy(() => import('./screens/ActionPlans/ConversionPlansPage').then(m => ({ default: m.ConversionPlansPage })));
const RetentionPlansPage = React.lazy(() => import('./screens/ActionPlans/RetentionPlansPage').then(m => ({ default: m.RetentionPlansPage })));
const EventsPlansPage = React.lazy(() => import('./screens/ActionPlans/EventsPlansPage').then(m => ({ default: m.EventsPlansPage })));
const SeasonalPlansPage = React.lazy(() => import('./screens/ActionPlans/SeasonalPlansPage').then(m => ({ default: m.SeasonalPlansPage })));
const ParallelTriggerPlansPage = React.lazy(() => import('./screens/ActionPlans/ParallelTriggerPlansPage').then(m => ({ default: m.ParallelTriggerPlansPage })));
const SeedDataPage = React.lazy(() => import('./screens/SeedData/SeedDataPage'));
const AccountPage = React.lazy(() => import('./screens/Settings/AccountPage').then(m => ({ default: m.AccountPage })));
const AccountInfoPage = React.lazy(() => import('./screens/Settings/AccountInfoPage').then(m => ({ default: m.AccountInfoPage })));
const ActionPlansSettingsPage = React.lazy(() => import('./screens/Settings/ActionPlansSettingsPage').then(m => ({ default: m.ActionPlansSettingsPage })));
const AddOnsPage = React.lazy(() => import('./screens/Settings/AddOnsPage').then(m => ({ default: m.AddOnsPage })));
const AnnouncementsPage = React.lazy(() => import('./screens/Settings/AnnouncementsPage').then(m => ({ default: m.AnnouncementsPage })));
const AngiAdsPage = React.lazy(() => import('./screens/Settings/AngiAdsPage').then(m => ({ default: m.AngiAdsPage })));
const AngiLeadsPage = React.lazy(() => import('./screens/Settings/AngiLeadsPage').then(m => ({ default: m.AngiLeadsPage })));
const ApiMonitorPage = React.lazy(() => import('./screens/Settings/ApiMonitorPage').then(m => ({ default: m.ApiMonitorPage })));
const AppointmentsPage = React.lazy(() => import('./screens/Settings/AppointmentsPage').then(m => ({ default: m.AppointmentsPage })));
const AuditLogsPage = React.lazy(() => import('./screens/Settings/AuditLogsPage').then(m => ({ default: m.AuditLogsPage })));
const BidTypesSettingsPage = React.lazy(() => import('./screens/Settings/BidTypesSettingsPage').then(m => ({ default: m.BidTypesSettingsPage })));
const CalendarSettingsPage = React.lazy(() => import('./screens/Settings/CalendarSettingsPage').then(m => ({ default: m.CalendarSettingsPage })));
const ChartBuilderPage = React.lazy(() => import('./screens/Settings/ChartBuilderPage').then(m => ({ default: m.ChartBuilderPage })));
const CompanyPage = React.lazy(() => import('./screens/Settings/CompanyPage').then(m => ({ default: m.CompanyPage })));
const ContactsSettingsPage = React.lazy(() => import('./screens/Settings/ContactsSettingsPage').then(m => ({ default: m.ContactsSettingsPage })));
const CurrencyPage = React.lazy(() => import('./screens/Settings/CurrencyPage').then(m => ({ default: m.CurrencyPage })));
const CustomFieldsPage = React.lazy(() => import('./screens/Settings/CustomFieldsPage').then(m => ({ default: m.CustomFieldsPage })));
const DataExportPage = React.lazy(() => import('./screens/Settings/DataExportPage').then(m => ({ default: m.DataExportPage })));
const DataImportPage = React.lazy(() => import('./screens/Settings/DataImportPage').then(m => ({ default: m.DataImportPage })));
const EmailSettingsPage = React.lazy(() => import('./screens/Settings/EmailSettingsPage').then(m => ({ default: m.EmailSettingsPage })));
const FormsPage = React.lazy(() => import('./screens/Settings/FormsPage').then(m => ({ default: m.FormsPage })));
const IntegrationsPage = React.lazy(() => import('./screens/Settings/IntegrationsPage').then(m => ({ default: m.IntegrationsPage })));
const JobsSettingsPage = React.lazy(() => import('./screens/Settings/JobsSettingsPage').then(m => ({ default: m.JobsSettingsPage })));
const LanguagePage = React.lazy(() => import('./screens/Settings/LanguagePage').then(m => ({ default: m.LanguagePage })));
const LeadSourcesPage = React.lazy(() => import('./screens/Settings/LeadSourcesPage').then(m => ({ default: m.LeadSourcesPage })));
const NotificationsPage = React.lazy(() => import('./screens/Settings/NotificationsPage').then(m => ({ default: m.NotificationsPage })));
const PaymentMethodsPage = React.lazy(() => import('./screens/Settings/PaymentMethodsPage').then(m => ({ default: m.PaymentMethodsPage })));
const PermissionsPage = React.lazy(() => import('./screens/Settings/PermissionsPage').then(m => ({ default: m.PermissionsPage })));
const PipelineSettingsPage = React.lazy(() => import('./screens/Settings/PipelineSettingsPage').then(m => ({ default: m.PipelineSettingsPage })));
const PrivacyPage = React.lazy(() => import('./screens/Settings/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const ProductsPage = React.lazy(() => import('./screens/Settings/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProfilePage = React.lazy(() => import('./screens/Settings/ProfilePage').then(m => ({ default: m.ProfilePage })));
const ReportsSettingsPage = React.lazy(() => import('./screens/Settings/ReportsSettingsPage').then(m => ({ default: m.ReportsSettingsPage })));
const SecurityPage = React.lazy(() => import('./screens/Settings/SecurityPage').then(m => ({ default: m.SecurityPage })));
const ServiceBridgePage = React.lazy(() => import('./screens/Settings/ServiceBridgePage').then(m => ({ default: m.ServiceBridgePage })));
const ServiceBridge2Page = React.lazy(() => import('./screens/Settings/ServiceBridge2Page').then(m => ({ default: m.ServiceBridge2Page })));
const TagsPage = React.lazy(() => import('./screens/Settings/TagsPage').then(m => ({ default: m.TagsPage })));
const TaskSettingPage = React.lazy(() => import('./screens/Settings/TaskSettingPage').then(m => ({ default: m.TaskSettingPage })));
const TeamPage = React.lazy(() => import('./screens/Settings/TeamPage').then(m => ({ default: m.TeamPage })));
const TelephonyPage = React.lazy(() => import('./screens/Settings/TelephonyPage').then(m => ({ default: m.TelephonyPage })));
const TemplatesSettingsPage = React.lazy(() => import('./screens/Settings/TemplatesSettingsPage').then(m => ({ default: m.TemplatesSettingsPage })));
const TextMessagingPage = React.lazy(() => import('./screens/Settings/TextMessagingPage').then(m => ({ default: m.TextMessagingPage })));
const ThemesPage = React.lazy(() => import('./screens/Settings/ThemesPage').then(m => ({ default: m.ThemesPage })));
const ThumbtackPage = React.lazy(() => import('./screens/Settings/ThumbtackPage').then(m => ({ default: m.ThumbtackPage })));
const TimeZonesPage = React.lazy(() => import('./screens/Settings/TimeZonesPage').then(m => ({ default: m.TimeZonesPage })));
const TriggersPage = React.lazy(() => import('./screens/Settings/TriggersPage').then(m => ({ default: m.TriggersPage })));
const UsersPage = React.lazy(() => import('./screens/Settings/UsersPage').then(m => ({ default: m.UsersPage })));
const WebhookMonitorPage = React.lazy(() => import('./screens/Settings/WebhookMonitorPage').then(m => ({ default: m.WebhookMonitorPage })));
const WebhooksPage = React.lazy(() => import('./screens/Settings/WebhooksPage').then(m => ({ default: m.WebhooksPage })));
const WorkflowsPage = React.lazy(() => import('./screens/Settings/WorkflowsPage').then(m => ({ default: m.WorkflowsPage })));

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
    element: <PipelineEmployeePage />
  },
  {
    path: '/pipeline/partner',
    element: <PipelinePartnerPage />
  },
  {
    path: '/pipeline/vendor',
    element: <PipelineVendorPage />
  },
  {
    path: '/pipeline/other',
    element: <PipelineOtherPage />
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
    element: <ContactsPartnerPage />
  },
  {
    path: '/contacts/vendor',
    element: <ContactsVendorPage />
  },
  {
    path: '/contacts/new-other',
    element: <ContactsOtherPage />
  },
  {
    path: '/contacts/all',
    element: <ContactsAllPage />
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
    element: <ConnectionPlansPage />
  },
  {
    path: '/action-plans/conversion',
    element: <ConversionPlansPage />
  },
  {
    path: '/action-plans/retention',
    element: <RetentionPlansPage />
  },
  {
    path: '/action-plans/events',
    element: <EventsPlansPage />
  },
  {
    path: '/action-plans/seasonal',
    element: <SeasonalPlansPage />
  },
  {
    path: '/action-plans/parallel-trigger',
    element: <ParallelTriggerPlansPage />
  },
  {
    path: '/templates',
    element: <TemplatesPage />
  },
  {
    path: '/templates/email',
    element: <EmailTemplatesPage />
  },
  {
    path: '/templates/task',
    element: <TaskTemplatesPage />
  },
  {
    path: '/templates/text',
    element: <TextTemplatesPage />
  },
  {
    path: '/templates/appt-invites',
    element: <ApptInvitesTemplatesPage />
  },
  {
    path: '/templates/notes-logs',
    element: <NotesLogsTemplatesPage />
  },
  {
    path: '/templates/export-list',
    element: <ExportListTemplatesPage />
  },
  {
    path: '/templates/dropdowns',
    element: <DropdownsTemplatesPage />
  },
  {
    path: '/templates/email-modal-test',
    element: <EmailTemplateModalTestPage />
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
    path: '/settings/account',
    element: <AccountPage />
  },
  {
    path: '/settings/account-info',
    element: <AccountInfoPage />
  },
  {
    path: '/settings/action-plans',
    element: <ActionPlansSettingsPage />
  },
  {
    path: '/settings/add-ons',
    element: <AddOnsPage />
  },
  {
    path: '/settings/announcements',
    element: <AnnouncementsPage />
  },
  {
    path: '/settings/angi-ads',
    element: <AngiAdsPage />
  },
  {
    path: '/settings/angi-leads',
    element: <AngiLeadsPage />
  },
  {
    path: '/settings/api-monitor',
    element: <ApiMonitorPage />
  },
  {
    path: '/settings/appointments',
    element: <AppointmentsPage />
  },
  {
    path: '/settings/audit-logs',
    element: <AuditLogsPage />
  },
  {
    path: '/settings/bid-types',
    element: <BidTypesSettingsPage />
  },
  {
    path: '/settings/calendar',
    element: <CalendarSettingsPage />
  },
  {
    path: '/settings/chart-builder',
    element: <ChartBuilderPage />
  },
  {
    path: '/settings/company',
    element: <CompanyPage />
  },
  {
    path: '/settings/contacts',
    element: <ContactsSettingsPage />
  },
  {
    path: '/settings/currency',
    element: <CurrencyPage />
  },
  {
    path: '/settings/custom-fields',
    element: <CustomFieldsPage />
  },
  {
    path: '/settings/data-export',
    element: <DataExportPage />
  },
  {
    path: '/settings/data-import',
    element: <DataImportPage />
  },
  {
    path: '/settings/email',
    element: <EmailSettingsPage />
  },
  {
    path: '/settings/forms',
    element: <FormsPage />
  },
  {
    path: '/settings/integrations',
    element: <IntegrationsPage />
  },
  {
    path: '/settings/jobs',
    element: <JobsSettingsPage />
  },
  {
    path: '/settings/language',
    element: <LanguagePage />
  },
  {
    path: '/settings/lead-sources',
    element: <LeadSourcesPage />
  },
  {
    path: '/settings/notifications',
    element: <NotificationsPage />
  },
  {
    path: '/settings/payment-methods',
    element: <PaymentMethodsPage />
  },
  {
    path: '/settings/permissions',
    element: <PermissionsPage />
  },
  {
    path: '/settings/pipeline',
    element: <PipelineSettingsPage />
  },
  {
    path: '/settings/privacy',
    element: <PrivacyPage />
  },
  {
    path: '/settings/products',
    element: <ProductsPage />
  },
  {
    path: '/settings/profile',
    element: <ProfilePage />
  },
  {
    path: '/settings/reports',
    element: <ReportsSettingsPage />
  },
  {
    path: '/settings/security',
    element: <SecurityPage />
  },
  {
    path: '/settings/seed-data',
    element: <SeedDataPage />
  },
  {
    path: '/settings/service-bridge',
    element: <ServiceBridgePage />
  },
  {
    path: '/settings/service-bridge-2',
    element: <ServiceBridge2Page />
  },
  {
    path: '/settings/tags',
    element: <TagsPage />
  },
  {
    path: '/settings/task-settings',
    element: <TaskSettingPage />
  },
  {
    path: '/settings/team',
    element: <TeamPage />
  },
  {
    path: '/settings/telephony',
    element: <TelephonyPage />
  },
  {
    path: '/settings/templates',
    element: <TemplatesSettingsPage />
  },
  {
    path: '/settings/text-messaging',
    element: <TextMessagingPage />
  },
  {
    path: '/settings/themes',
    element: <ThemesPage />
  },
  {
    path: '/settings/thumbtack',
    element: <ThumbtackPage />
  },
  {
    path: '/settings/time-zones',
    element: <TimeZonesPage />
  },
  {
    path: '/settings/triggers',
    element: <TriggersPage />
  },
  {
    path: '/settings/users',
    element: <UsersPage />
  },
  {
    path: '/settings/webhook-monitor',
    element: <WebhookMonitorPage />
  },
  {
    path: '/settings/webhooks',
    element: <WebhooksPage />
  },
  {
    path: '/settings/workflows',
    element: <WorkflowsPage />
  }
];
