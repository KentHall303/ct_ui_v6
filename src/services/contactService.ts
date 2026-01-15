import { supabase, Contact, Opportunity, ContactType } from '../lib/supabase';
import { createCalendarForContact, updateCalendarName, deleteCalendarForContact } from './calendarService';
import { salesCycleService, SalesCycle } from './salesCycleService';

export interface ContactsQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  contactType?: ContactType;
}

export interface ContactsResponse {
  contacts: Contact[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const contactService = {
  async getAll(params: ContactsQueryParams = {}): Promise<ContactsResponse> {
    const {
      page = 1,
      pageSize = 40,
      search = '',
      sortBy = 'name',
      sortDirection = 'asc',
      contactType
    } = params;

    let query = supabase
      .from('contacts')
      .select(`
        *,
        opportunities!opportunity_id(
          id,
          sales_cycle_id,
          sales_cycles!sales_cycle_id(
            name
          )
        )
      `, { count: 'exact' });

    query = query.not('opportunity_id', 'is', null);

    if (contactType) {
      query = query.eq('contact_type', contactType);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,cell_phone.ilike.%${search}%`);
    }

    query = query.order(sortBy, { ascending: sortDirection === 'asc' });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch contacts: ${error.message}`);
    }

    const contacts = (data || []).map((contact: any) => {
      const salesCycleName = contact.opportunities?.sales_cycles?.name || contact.sales_cycle;
      return {
        ...contact,
        sales_cycle: salesCycleName,
        opportunities: undefined
      };
    });

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      contacts,
      total,
      page,
      pageSize,
      totalPages
    };
  },

  async getByType(contactType: ContactType, params: Omit<ContactsQueryParams, 'contactType'> = {}): Promise<ContactsResponse> {
    return this.getAll({ ...params, contactType });
  },

  async getById(id: string): Promise<Contact | null> {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch contact: ${error.message}`);
    }

    return data;
  },

  async create(contact: Partial<Contact>): Promise<Contact> {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contact)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create contact: ${error.message}`);
    }

    if (data && data.name) {
      await createCalendarForContact(data.id, data.name);
    }

    return data;
  },

  async update(id: string, contact: Partial<Contact>): Promise<Contact> {
    const { data, error } = await supabase
      .from('contacts')
      .update({
        ...contact,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update contact: ${error.message}`);
    }

    if (data && contact.name) {
      await updateCalendarName(data.id, contact.name);
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete contact: ${error.message}`);
    }
  },

  async createWithOpportunity(contactData: {
    firstName: string;
    lastName: string;
    email?: string;
    cellPhone?: string;
    state?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    leadSource?: string;
    assignedUser?: string;
    salesCycleId?: string;
    actionPlanId?: string;
    contactType?: ContactType;
  }): Promise<{ contact: Contact; opportunity: Opportunity }> {
    let salesCycle: SalesCycle | null = null;

    if (contactData.salesCycleId) {
      salesCycle = await salesCycleService.getById(contactData.salesCycleId);
    } else {
      const allCycles = await salesCycleService.getAll();
      salesCycle = allCycles.find(c => c.name === 'New Lead') || allCycles[0] || null;
    }

    if (!salesCycle) {
      throw new Error('No sales cycle available');
    }

    const fullName = `${contactData.firstName} ${contactData.lastName}`.trim();

    const contactTypeValue = contactData.contactType || 'Client';

    const { data: contact, error: contactError } = await supabase
      .from('contacts')
      .insert({
        name: fullName,
        email: contactData.email || null,
        cell_phone: contactData.cellPhone || null,
        state: contactData.state || null,
        address: contactData.address || null,
        city: contactData.city || null,
        postal_code: contactData.postalCode || null,
        lead_source: contactData.leadSource || null,
        assigned_user: contactData.assignedUser || null,
        sales_cycle: salesCycle.name,
        created_date: new Date().toISOString().split('T')[0],
        status_color: 'bg-success',
        contact_type: contactTypeValue,
      })
      .select()
      .single();

    if (contactError) {
      throw new Error(`Failed to create contact: ${contactError.message}`);
    }

    const { data: opportunity, error: opportunityError } = await supabase
      .from('opportunities')
      .insert({
        contact_id: contact.id,
        contact_name: fullName,
        email: contactData.email || null,
        phone: contactData.cellPhone || null,
        sales_cycle_id: salesCycle.id,
        priority: 'new_lead',
        lead_source: contactData.leadSource || null,
        contact_type: contactTypeValue,
        order_position: 0,
      })
      .select()
      .single();

    if (opportunityError) {
      await supabase.from('contacts').delete().eq('id', contact.id);
      throw new Error(`Failed to create opportunity: ${opportunityError.message}`);
    }

    const { error: linkError } = await supabase
      .from('contacts')
      .update({ opportunity_id: opportunity.id })
      .eq('id', contact.id);

    if (linkError) {
      await supabase.from('opportunities').delete().eq('id', opportunity.id);
      await supabase.from('contacts').delete().eq('id', contact.id);
      throw new Error(`Failed to link contact to opportunity: ${linkError.message}`);
    }

    if (contact && contact.name) {
      await createCalendarForContact(contact.id, contact.name);
    }

    return { contact: { ...contact, opportunity_id: opportunity.id }, opportunity };
  },

  async updateWithOpportunity(
    contactId: string,
    contactData: {
      firstName?: string;
      lastName?: string;
      email?: string;
      cellPhone?: string;
      state?: string;
      address?: string;
      city?: string;
      postalCode?: string;
      leadSource?: string;
      assignedUser?: string;
      salesCycleId?: string;
      actionPlanId?: string;
      contactType?: ContactType;
    }
  ): Promise<{ contact: Contact; opportunity?: Opportunity }> {
    const existingContact = await this.getById(contactId);
    if (!existingContact) {
      throw new Error('Contact not found');
    }

    let fullName = existingContact.name;
    if (contactData.firstName !== undefined || contactData.lastName !== undefined) {
      const nameParts = existingContact.name?.split(' ') || ['', ''];
      const firstName = contactData.firstName ?? nameParts[0];
      const lastName = contactData.lastName ?? nameParts.slice(1).join(' ');
      fullName = `${firstName} ${lastName}`.trim();
    }

    let salesCycleName = existingContact.sales_cycle;
    if (contactData.salesCycleId) {
      const salesCycle = await salesCycleService.getById(contactData.salesCycleId);
      if (salesCycle) {
        salesCycleName = salesCycle.name;
      }
    }

    const { data: contact, error: contactError } = await supabase
      .from('contacts')
      .update({
        name: fullName,
        email: contactData.email ?? existingContact.email,
        cell_phone: contactData.cellPhone ?? existingContact.cell_phone,
        state: contactData.state ?? existingContact.state,
        address: contactData.address ?? existingContact.address,
        city: contactData.city ?? existingContact.city,
        postal_code: contactData.postalCode ?? existingContact.postal_code,
        lead_source: contactData.leadSource ?? existingContact.lead_source,
        assigned_user: contactData.assignedUser ?? existingContact.assigned_user,
        sales_cycle: salesCycleName,
        contact_type: contactData.contactType ?? existingContact.contact_type,
        updated_at: new Date().toISOString(),
      })
      .eq('id', contactId)
      .select()
      .single();

    if (contactError) {
      throw new Error(`Failed to update contact: ${contactError.message}`);
    }

    if (fullName !== existingContact.name) {
      await updateCalendarName(contact.id, fullName);
    }

    let opportunity: Opportunity | undefined;
    if (existingContact.opportunity_id && contactData.salesCycleId) {
      const salesCycle = await salesCycleService.getById(contactData.salesCycleId);
      if (salesCycle) {
        const { data: updatedOpp, error: oppError } = await supabase
          .from('opportunities')
          .update({
            contact_name: fullName,
            email: contactData.email ?? existingContact.email,
            phone: contactData.cellPhone ?? existingContact.cell_phone,
            sales_cycle_id: salesCycle.id,
            lead_source: contactData.leadSource ?? existingContact.lead_source,
            contact_type: contactData.contactType ?? existingContact.contact_type ?? 'Client',
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingContact.opportunity_id)
          .select()
          .single();

        if (!oppError && updatedOpp) {
          opportunity = updatedOpp;
        }
      }
    }

    return { contact, opportunity };
  },

  async updateContactType(contactId: string, newType: ContactType): Promise<{ contact: Contact; opportunity?: Opportunity }> {
    const existingContact = await this.getById(contactId);
    if (!existingContact) {
      throw new Error('Contact not found');
    }

    const { data: contact, error: contactError } = await supabase
      .from('contacts')
      .update({
        contact_type: newType,
        updated_at: new Date().toISOString(),
      })
      .eq('id', contactId)
      .select()
      .single();

    if (contactError) {
      throw new Error(`Failed to update contact type: ${contactError.message}`);
    }

    let opportunity: Opportunity | undefined;
    if (existingContact.opportunity_id) {
      const { data: updatedOpp, error: oppError } = await supabase
        .from('opportunities')
        .update({
          contact_type: newType,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingContact.opportunity_id)
        .select()
        .single();

      if (!oppError && updatedOpp) {
        opportunity = updatedOpp;
      }
    }

    return { contact, opportunity };
  },

  async updateInline(contactId: string, updates: Partial<Contact>): Promise<Contact> {
    const { contact_type, ...otherUpdates } = updates;

    const updatePayload: Record<string, any> = {
      ...otherUpdates,
      updated_at: new Date().toISOString(),
    };

    if (contact_type) {
      updatePayload.contact_type = contact_type;
    }

    const { data: contact, error: contactError } = await supabase
      .from('contacts')
      .update(updatePayload)
      .eq('id', contactId)
      .select()
      .single();

    if (contactError) {
      throw new Error(`Failed to update contact: ${contactError.message}`);
    }

    const existingContact = await this.getById(contactId);
    if (existingContact?.opportunity_id && contact_type) {
      await supabase
        .from('opportunities')
        .update({
          contact_type: contact_type,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingContact.opportunity_id);
    }

    if (updates.name && existingContact) {
      await updateCalendarName(contact.id, updates.name);
    }

    return contact;
  },
};
