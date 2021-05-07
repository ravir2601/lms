import { Income } from './income.model';
export class Financial {
    update_url: string;

    categories: Income[];

    // Banking
    average_bank_balance: number;
    loan_emi_bounces: number;
    other_cheque_bounces: number;

    // Business Expenses
    expenses_by_cash_and_others: number;
    expenses_by_cheque: number;
    monthly_expenses: number;

    current_inventory_level: number;
    inventory_rotation_ratio: number;
    other_expenses: number;

    premise_area_in_sqft: number;
    premise_monthly_rent: number;

    no_of_employees: number;
    monthly_salary: number;

    monthly_income: number;
    total_additional_income: number;
    total_financial_expenses: number;
    total_monthly_expenses: number;
    net_monthly_emi_capacity: number;

    // Person Expenses
    residence_premise_area_in_sqft: number;
    residence_premise_rent: number;
    personal_expenses: number;
    personal_expenses_comment: string;
    other_expenses_comment: string;

    no_of_dependents: number;
    minor_dependents: number;
    non_minor_dependents: number;

}
