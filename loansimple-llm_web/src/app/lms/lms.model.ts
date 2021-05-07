export class Pos {
    id: number;
    doc_id: string;
    txn_id: string;
    collection_amount: string;
    comment: string;
    created_at: '';
    date: '';
    file: string;
    merchant_settlement_file: string;
    nbfc_settlement_file: string;
    service_provider: string;
    settlement_date: string;
    status: string;
    txn_file: string;
    update_url: string;
    updated_at: string;
    user: object;
    

    /**
     * Constructor
     *
     * @param pos: pos
     */
    constructor(pos?) {
        pos = pos || {};
        this.id = pos.id || 0;
        this.doc_id = pos.doc_id || '';
        this.txn_id = pos.txn_id || '';
        this.collection_amount = pos.collection_amount || '';
        this.comment = pos.comment || '';
        this.created_at = pos.created_at || '';
        this.date = pos.date || '';
        this.file = pos.file || '';
        this.merchant_settlement_file = pos.merchant_settlement_file || '';
        this.nbfc_settlement_file = pos.sub_status || '';
        this.service_provider = pos.service_provider || '';
        this.settlement_date = pos.settlement_date || '';
        this.status = pos.status || '';
        this.txn_file = pos.txn_file || '';
        this.update_url = pos.update_url || '';
        this.updated_at = pos.updated_at || '';
        this.user = pos.user ? new User(pos.user) : {};
    }
}

class User {
    display_name: string;
    email: string;
    emp_code: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    full_name: string;
    id: number;
    is_superuser: boolean;
    photo: string;
    username:string;

    constructor(user?) {
        user = user || {};
        this.display_name = user.display_name || '';
        this.email = user.email || '';
        this.emp_code = user.emp_code || '';
        this.first_name = user.first_name || '';
        this.middle_name = user.middle_name || '';
        this.last_name = user.last_name || '';
        this.full_name = user.full_name || '';
        this.id = user.id || 0;
        this.is_superuser = user.is_superuser || false;
        this.photo = user.photo || '';
        this.username = user.username || '';
    }
}

 
