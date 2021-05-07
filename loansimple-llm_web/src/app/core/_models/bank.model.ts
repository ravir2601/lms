import { Document } from './document.model';
import { Issue } from './issue.model';

export class Bank {
    id: number;
    account_holder_name: string;
    account_number: string;
    account_type: string;
    doc_name = '';
    is_for_disbursement: boolean;
    is_for_pos_collection: boolean;
    is_for_nach: boolean;
    is_for_pdcs: boolean;
    pdcs_count: number;
    is_for_spdcs: boolean;
    spdcs_count: number;
    is_for_pos_deposit_cheque: boolean;
    is_netbanking_available: string;
    ifsc: string;
    branch: Branch;
    doc_type: string;
    doc_issues: Issue[];
    doc_histories: Document[];
    file: string;
    update_url: string;
}

export class Branch {
    ifsc: string;
    name: string;
    branch_name: string;
}

export class BankStatement {
    id: number;
    is_password_protected: boolean;
    password: string;
    from_date: string;
    to_date: string;
    file: File;
    doc_issues: Issue[];
    doc_histories: Document[];
    update_url: string;
}
