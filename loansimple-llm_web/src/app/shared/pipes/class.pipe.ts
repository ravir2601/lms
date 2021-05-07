// Angular
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns only first letter of string
 */
@Pipe({
    name: 'class'
})
export class ClassPipe implements PipeTransform {
    map = {
        true: 'success',
        false: 'danger',
        not_credited: 'warning',
        bounced: 'danger',
        success: 'success',
        pending_receiving: 'warning',
        pending_confirmation: 'warning',

        // Application States
        upload_documents: 'warning',
        information_gathering: 'warning',
        quality_check: 'info',
        underwriting: 'info',
        pending_loan_documents_quality_check: 'info',
        document_signing: 'warning',
        signed_document_upload_pending: 'warning',
        disbursement_verification: 'info',
        disburse_loan: 'info',
        lms: 'success',
        not_interested: 'danger',
        freezed: 'danger',
        rejected: 'danger',

        // Application Sub Status
        pending_onboarding_call: 'info',
        negotiation_required: 'danger',
        pending_offer_confirmation: 'warning',
        pending_offer_approval: 'warning',
        pending_offer: 'info'
    };

    /**
     * Transform
     *
     * @param value: any
     * @param args: any
     */
    transform(value: any): any {
        return this.map[value] || 'primary';
    }
}
