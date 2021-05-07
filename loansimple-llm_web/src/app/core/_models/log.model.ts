import { Business } from './business.model';
export class Log {
    id: string;
    type: string;
    text: string;
    call_log_type: string;
    call_log_outcome: string;
    business: Business;
    update_url: string;
}
