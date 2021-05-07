import { Business } from '../../core/_models/business.model';
import { User } from '../../core/_models/user.model';
import { LoanData } from './loan-data.model';
import { OnboardingCallCheck } from './onboarding-call-check';
import { State } from './state.model';
export class Application {
    id: number;
    application_id: string;
    product_type: string;
    business: Business;
    update_url: string;
    created_at: string;
    is_topup: boolean;
    case_owner: User;
    state: State;
    extra: ApplicationExtra;
    loan_data: LoanData;
    nbfc: number;
    onboarding_call_checks: OnboardingCallCheck[];
}

export class ApplicationExtra {
    update_url: string;

    pd_result: string;
    pd_note: string;
    pd_file: string;
    is_physical_pd_required: boolean;

    onboarding_call_comment: string;
    is_onboarding_call_done: boolean;
    onboarding_call_file: string;
}
