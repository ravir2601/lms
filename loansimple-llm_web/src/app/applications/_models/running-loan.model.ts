export class RunningLoan {
    lender: string;
    type: string;
    emi_monthly: number;
    remaining_tenure_in_month: number;
    total_credit_limit: number;
    available_credit_limit: number;
    is_overdue_amount: boolean;
    is_to_include: boolean;
    overdue_amount: number;
    emi_day: number;

    update_url: string;
}
