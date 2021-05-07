export class PtpListModel {
    id: number;
    right_person_contact: string;
    created_at: string;
    status: string;
    reason: string;
    payment_mode: string;
    loan_account: object;
    repayment: object;

    constructor(data?) {
        this.id = data.id || '';
        this.right_person_contact = data.right_person_contact || '';
        this.created_at = data.created_at || '';
        this.status = data.status || '';
        this.reason = data.reason || '';
        this.payment_mode = data.payment_mode || '';
        this.loan_account = data.loan_account ? new LoanAccount(data.loan_account) : {};
        this.repayment = data.repayment ? new Repayment(data.repayment) : {};
    }
}

class LoanAccount {
    loan_account_id: number;
    id: number;
    business: object;
    constructor(loan?) {
        loan = loan || {};
        this.loan_account_id = loan.loan_account_id || 0;
        this.id = loan.id || 0;
        this.business = loan.business ? new Business(loan.business) : {};
    }
}

class Business {
    name: string;
    constructor(business?) {
        business = business || {};
        this.name = business.name || 0;
    }
}

class Repayment {
    id: number;
    txn_id: string;
    field_visit: object;

    constructor(repayment?) {
        repayment = repayment || {};
        this.id = repayment.id || 0;
        this.txn_id = repayment.txn_id || 0;
        this.field_visit = repayment.field_visit ? repayment.field_visit.is_visit_done : '';
    }
}
