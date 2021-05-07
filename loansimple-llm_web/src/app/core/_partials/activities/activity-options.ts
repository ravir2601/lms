export const EXCLUDE = ['from_updated_at', 'to_updated_at'];
export const OPTIONS = {
    business_added: ['business_id', 'name'],

    business_extra_added: ['source', 'product_type'],
    business_person_added: ['person_id', 'full_name'],

    person_document_added: ['doc_type', 'doc_name', 'file'],
    person_document_deleted: ['doc_type', 'doc_name', 'file'],
    business_document_added: ['doc_type', 'doc_name', 'file'],

    person_address_added: ['state', 'city', 'locality', 'address_line', 'address_type'],
    person_address_deleted: ['state', 'city', 'locality', 'address_line', 'address_type'],
    business_address_added: ['state', 'city', 'locality', 'address_line', 'address_type'],
    business_address_deleted: ['state', 'city', 'locality', 'address_line', 'address_type'],

    business_photo_added: ['file', 'tag'],
    business_photo_deleted: ['file', 'tag'],

    business_bank_added: ['bank_name', 'ifsc'],
    business_bank_deleted: ['bank_name', 'ifsc'],

    document_issue_added: ['reason', 'remark', 'status'],
    document_issue_deleted: ['reason', 'remark', 'status'],
    business_issue_added: ['reason', 'remark', 'status'],

    business_comment_added: ['type', 'text', 'call_log_type', 'call_log_outcome'],

    bank_statement_added: ['file'],
    bank_statement_deleted: ['file'],

    person_mobile_added: ['detail'],
    person_mobile_deleted: ['detail'],
    person_email_added: ['detail'],
    person_email_deleted: ['detail'],

    business_nominee_added: ['name', 'relation'],
    business_nominee_deleted: ['name', 'relation'],
    person_reference_added: ['name', 'relation'],
    person_reference_deleted: ['name', 'relation'],
    business_reference_added: ['name', 'relation'],
    business_reference_deleted: ['name', 'relation'],
    person_father_or_spouse_added: ['name', 'relation'],
    person_father_or_spouse_deleted: ['name', 'relation'],
    person_emergency_contact_added: ['name', 'relation'],
    person_emergency_contact_deleted: ['name', 'relation'],

    business_reminder_added: ['purpose', 'scheduled_at'],
};




// recreated
// create_duplicate_hit
// case_owner_changes
// business_created_freshly
// business_deleted
// login_approved
// login_issue_marked
// sent_for_approval
// business_cibil_added
// business_cibil_deleted
// business_running_loan_added
// business_running_loan_deleted
// business_income_source_added
// business_income_source_deleted
// business_person_deleted
// person_photo_added
// person_photo_deleted
// person_cibil_added
// person_cibil_deleted
// person_running_loan_added
// person_running_loan_deleted
// person_income_source_added
// person_income_source_deleted
// business_financial_added
// business_financial_deleted
// business_mobile_verified