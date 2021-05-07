
export class PdcList {
    id: number;
    pdc: object
    date: string;
    cheque_no: string;
    amount: number;
    file: string;
    comment: string;
    loan_account : object

    constructor(data?) {
        this.id = data.id || '';
        this.pdc = data.pdc ? new Pdc(data.pdc) : {};
        this.loan_account = data.loan_account ? new LoanAccount(data.loan_account) : {};
    }
}

class Pdc {
    id: number;
    date: string;
    cheque_no: string;
    amount: number;
    file: string;
    comment: string;

    constructor(pdc?) {
        this.id = pdc.id || '';
        this.date = pdc.date || '';
        this.cheque_no = pdc.cheque_no || '';
        this.amount = pdc.amount || '';
        this.file = pdc.file || '';
        this.comment = pdc.comment || '';
    }
}

class LoanAccount {
    loan_account_id: number;
    id: number;

    constructor(loan?) {
        loan = loan || {};
        this.loan_account_id = loan.loan_account_id || 0;
        this.id = loan.id || 0;
    }
}
