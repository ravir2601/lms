export const negativeActions = [
    { name: 'Not Contactable', key: 'contactability_issue' },
    { name: 'Not Interested', key: 'not_interested' },
    { name: 'Rejected', key: 'rejected' },
];

export const states = [
    {
        key: 'information_gathering', name: 'Info Gathering', icon: 'fa-clipboard-list',
        nav: [
            {
                actions: [{ name: 'Mark as Information Gathered', key: 'information_gathered' }],
                class: 'btn-success',
            }
        ]
    },
    {
        key: 'quality_check', name: 'Quality Checked', icon: 'fa-clipboard-check',
        nav: [
            {
                actions: [{ name: 'Mark as Quality Checked', key: 'quality_checked' }],
                class: 'btn-success',
            },
            {
                actions: [{ name: 'Send to Info Gathering', key: 'send_to_information_gathering' }],
                class: 'btn-danger'
            }
        ]
    },
    { 
        key: 'pending_offer', name: 'Generate Offer', icon: 'fa-cogs',
        nav: [
            {
                actions: [{ name: 'Generate Offer', key: 'generate_offer' }],
                class: 'btn-success',
            },
            {
                actions: [{ name: 'Send for Credit Review', key: 'send_for_credit_review' }],
                class: 'btn-success',
            },
            {
                actions: [{ name: 'Send to Info Gathering', key: 'send_to_information_gathering' }],
                class: 'btn-danger'
            }
        ]
    },
    {
        key: 'pending_offer_approval', name: 'Offer Approved', icon: 'fa-check-double' ,
        nav: [
            {
                actions: [{ name: 'Offer Approved', key: 'offer_approved' }],
                class: 'btn-success',
            },
            {
                actions: [{ name: 'Send to Info Gathering', key: 'send_to_information_gathering' }],
                class: 'btn-danger'
            }
        ]
    },
    { 
        key: 'pending_offer_confirmation', name: 'Customer Confirmed Offer', icon: 'fa-user-check',
        nav: [
            {
                actions: [{ name: 'Customer Confirmed Order', key: 'customer_confirmed_order' }],
                class: 'btn-success',
            },
            {
                actions: [{ name: 'Customer requires Negotiation', key: '~' }],
                class: 'btn-warning',
            },
            {
                actions: [{ name: 'Send to Info Gathering', key: 'send_to_information_gathering' }],
                class: 'btn-danger'
            }
        ]
    },
    { 
        key: 'pending_loan_documents_quality_check', name: 'Loan Doc QCed', icon: 'fa-shield-alt',
        nav: [
            {
                actions: [
                    { name: 'Loan Document Quality Checked', key: 'loan_documents_quality_checked' },
                    { name: 'Onboarding Call Done', key: 'onboarding_call_done' }
                ],
                class: 'btn-success',
            },
            {
                actions: [{ name: 'Send to Info Gathering', key: 'send_to_information_gathering' }],
                class: 'btn-danger'
            }
        ]
    },
    {
        key: 'signed_document_upload_pending', name: 'Signed Docs Uploaded', icon: 'fa-signature',
        nav: [
            {
                actions: [
                    { name: 'Signed Document Uploaded', key: 'signed_document_uploaded' },
                    { name: 'Reupload Customer Signing Document', key: 're_upload_document_signing' },
                    { name: 'Onboarding Call Done', key: 'onboarding_call_done' }
                ],
                class: 'btn-success',
            },
            {
                actions: [{ name: 'Send to Info Gathering', key: 'send_to_information_gathering' }],
                class: 'btn-danger'
            }
        ]
    },
    { 
        key: 'disbursement_verification', name: 'Disbursement Verified', icon: 'fa-flag',
        nav: [
            {
                actions: [{ name: 'Disbursement Verified', key: 'disbursement_verified' }],
                class: 'btn-success',
            },
            {
                actions: [{  name: 'Send to Info Gathering', key: 'send_to_information_gathering' }],
                class: 'btn-danger'
            }
        ]
    },
    { 
        key: 'disburse_loan', name: 'Disburse Loan', icon: 'fa-flag-checkered' ,
        nav: [
            {
                actions: [{ name: 'Disburse Loan', key: 'disburse_loan' }],
                class: 'btn-success',
            },
            {
                actions: [{ name: 'Send to Info Gathering', key: 'send_to_information_gathering' }],
                class: 'btn-danger'
            }
        ]
    }
];

export const dict = [
    'information_gathering', 'quality_check', 'pending_offer', 'pending_offer_approval',
    'pending_offer_confirmation', 'pending_loan_documents_quality_check',
    'signed_document_upload_pending', 'disbursement_verification', 'disburse_loan', 'lms'
];
