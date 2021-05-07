import { Topups } from './topups.model';
import { BusinessPerson, Person } from './person.model';


export class LoanAccounts {
    id: number;
    loan_account_id: string;
    business: BusinessPerson;
    is_nach_active: boolean;
    is_closed: boolean;
    product_type: string;
    account_manager: AccountManager;
    extra: Extra;
    topups: Topups[];
    update_url: string;
}

export class AccountManager {
    display_name: string;
    name: string;
}

export class Extra {
    product_type: string;
    total_outstanding: number;
    days_onboard: number;
    current_dpds: string;
    total_nach_bounces: string;
    total_cheque_bounces: string;
    total_sanctioned_amount: string;
    total_loan_repayment: string;
    total_repayment: string;
    current_daily_repayment: string;
    territory_owner: Person;
    case_owner: Person;
    active_pdcs: Pdcs[];
    active_spdcs: Pdcs[];
}

export class Pdcs {
    id: number;
}