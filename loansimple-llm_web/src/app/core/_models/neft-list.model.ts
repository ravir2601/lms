
export class NEFTList {
    id: number;
    received_receipt_no: string;
    date: string;
    loan_account: object;
    loan_expected: number;
    status: string;

    constructor(data?) {
        this.id = data.id || '';
        this.received_receipt_no = data.received_receipt_no || '';
        this.date = data.date || '';
        this.loan_account = data.loan_account ? new LoanAccount(data.loan_account) : {};
        this.loan_expected = data.loan_expected || 0;
        this.status = data.status || '';
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
