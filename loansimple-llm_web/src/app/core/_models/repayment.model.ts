export class Repayment {
    id: string;
    update_url: string;
    txn_id: string;
    date: string;
    total_expected: string;
    total_actual: string;
    opening_balance: string;
    payment_mode: string;
    payment_type: string;
    status: string;
    bounce_reason: string;
    comment: string;
    ref_no: null;
    penalty: null;
    cheque_no: null;
    is_nach_manual: boolean;
    is_sent_to_for_enach: boolean;
    loan_account: number;
    pdc: null;
    penalty_actual: string;
    received_receipt_no: null;
}
