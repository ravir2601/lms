export class LoanData {
    update_url: string;

    tenure_in_months: number;

    total_sanctioned_amount: number;
    // tenure_in_months: number;
    interest_rate: number;
    interest_amount: number;

    processing_fee_percentage: number;
    processing_fee_absolute: number;
    processing_fee_tax: number;
    total_processing_fee: number;

    insurance_premium: number;
    insurance_premium_tax: number;
    total_insurance_premium: number;

    nach_fee: number;
    nach_fee_tax: number;
    total_nach_fee: number;

    total_loan_repayment: number;
    daily_loan_repayment: number;
    disbursement_amount: number;
}
