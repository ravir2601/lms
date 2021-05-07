export const STRUCTURE = [
    {
        key: 'total_sanctioned_amount',
        title: 'Total Sanctioned Amount',
        type: 'stepper',
        steps: 1000,
        min: 0,
        max: 500000,
        negotiable: true
    },
    {
        key: 'tenure_in_months',
        title: 'Tenure (in Months)',
        type: 'select',
        negotiable: true
    },
    {
        key: 'interest_rate',
        title: 'Interest Rate (%)',
        type: 'stepper',
        steps: 0.5,
        min: 0,
        max: 40,
        negotiable: true,
        children: [
            {
                key: 'interest_amount',
                title: 'Interest Amount',
                type: 'text',
            }
        ]
    },
    {
        key: 'processing_fee_percentage',
        title: 'Processing Fee (%)',
        type: 'stepper',
        steps: 0.5,
        min: 0,
        max: 2.5,
        negotiable: true,
        children: [
            {
                key: 'processing_fee_absolute',
                title: 'Processing Fee Amount',
                type: 'text',
            },
            {
                key: 'processing_fee_tax',
                title: 'GST Amount',
                type: 'text',
            },
            {
                key: 'total_processing_fee',
                title: 'Processing Fees (incl. GST)',
                type: 'text',
            }
        ]
    },
    {
        key: 'insurance_premium',
        title: 'Insurance Premium',
        type: 'text',
        children: [
            {
                key: 'insurance_premium_tax',
                title: 'GST Amount',
                type: 'text',
            },
            {
                key: 'total_insurance_premium',
                title: 'Insurance Premium (Incl. GST)',
                type: 'text',
            }
        ]
    },
    {
        key: 'nach_fee',
        title: 'NACH Fees',
        type: 'text',
        children: [
            {
                key: 'nach_fee_tax',
                title: 'GST Amount',
                type: 'text',
            },
            {
                key: 'total_nach_fee',
                title: 'Total NACH Fees (incl. GST)',
                type: 'text',
            }
        ]
    },
    {
        key: 'total_loan_repayment',
        title: 'Total Loan Repayment',
        type: 'text',
    },
    {
        key: 'disbursement_amount',
        title: 'Disbursement Amount',
        type: 'text',
    },
    {
        key: 'daily_loan_repayment',
        title: 'Daily Loan Repayment',
        type: 'text',
    }
];
