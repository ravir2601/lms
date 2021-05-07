export class AddLead {
    id: string;
    name: string;
    mobile: number
    status: string;
    sub_status: string;
    created_at: string;
    user: string;
    source: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    address: object;

    /**
     * Constructor
     *
     * @param lead: lead
     */
    constructor(lead?) {
        lead = lead || {};
        this.id = lead.id || 0;
        this.name = lead.name || '';
        this.mobile = lead.mobile || '';
        this.status = lead.status || '';
        this.sub_status = lead.sub_status || '';
        this.created_at = lead.created_at || '';
        this.user = lead.user || '';
        this.source = lead.source || '';
        this.first_name = lead.first_name || '';
        this.middle_name = lead.middle_name || '';
        this.last_name = lead.last_name || '';
        this.address = lead.address ? new Address(lead.address) : {};
    }
}

class Address {
    city: string;
    state: string;
    constructor(address?) {
        this.city = address.city || '';
        this.state = address.state || '';
    }
}

