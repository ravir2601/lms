export class unrRegions {
    id: number;
    code: string;
    name: string;
    type: string;
    pincode: string;
    is_approved: boolean;
    unapproved_reason: string;
    kyc_pincodes: any;
    state_code: string;
    state_short_code: string;
    cluster_id: any;
    belongs_to: any;

    constructor(user?) {
        this.id = user.id || '';
        this.code = user.code || '';
        this.name = user.name || '';
        this.type = user.type || '';
        this.pincode = user.pincode || '';
        this.is_approved = user.is_approved || false;
        this.unapproved_reason = user.unapproved_reason || '';
        this.kyc_pincodes = user.kyc_pincodes || [];
        this.state_code = user.state_code || '';
        this.state_short_code = user.state_short_code || '';
        this.cluster_id = user.cluster_id || '';
        this.belongs_to = user.belongs_to || '';
    }
}


