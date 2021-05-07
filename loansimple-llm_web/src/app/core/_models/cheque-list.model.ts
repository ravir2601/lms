import { PrimaryPerson } from "./person.model";

export class ChequeList {
    id: number;
    deposited_date: string;
    received_date: string;
    received_receipt_no: string;
    received_receipt_file: string;
    deposited_receipt_no: string
    deposited_receipt_file: string
    date: string;
    loan_account: object;
    repayment: object;
    assigned_to: object;
    total_expected: number;
    total_actual: number;
    status: string;
    pdc: object;
    cheque_no: string;
    cheque_file: string;
    payment_mode: string;

    constructor(data?) {
        this.id = data.id || '';
        this.deposited_date = data.deposited_date || '';
        this.received_date = data.received_date || '';
        this.received_receipt_no = data.received_receipt_no || '';
        this.received_receipt_file = data.received_receipt_file || '';
        this.deposited_receipt_no = data.deposited_receipt_no || '';
        this.deposited_receipt_file = data.deposited_receipt_file || '';
        this.date = data.date || '';
        this.loan_account = data.loan_account ? new LoanAccount(data.loan_account) : {};
        this.assigned_to = data.assigned_to ? data.assigned_to.display_name : '';
        this.total_expected = data.total_expected || 0;
        this.total_actual = data.total_actual || 0;
        this.status = data.status || '';
        this.pdc = data.pdc ? data.pdc.file : {};
        this.cheque_no = data.cheque_no || '';
        this.cheque_file = data.cheque_file || '';
        this.payment_mode = data.payment_mode || '';

    }
}

class LoanAccount {
    loan_account_id: number;
    id: number;
    business_name: object;
    city: string;
    state: string;

    constructor(loan?) {
        loan = loan || {};
        this.loan_account_id = loan.loan_account_id || 0;
        this.id = loan.id || 0;
        this.business_name = loan.business ? new Business(loan.business) : {};
    }
}


class Business {
    loan_account_id: number;
    name: string;
    primary_person: object;

    constructor(business?) {
        business = business || {};
        this.loan_account_id = business.loan_account_id || 0;
        this.name = business.name || 0;
        this.primary_person = business.primary_person ? new Person(business.primary_person) : {};

    }
}

class Person {
    full_name: string;
    constructor(person?) {
        person = person || {};
        this.full_name = person.person.full_name || '';
    }
}
