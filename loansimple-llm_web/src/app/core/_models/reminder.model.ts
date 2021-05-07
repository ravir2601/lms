import { Business } from './business.model';
export class Reminder {
    id: string;
    scheduled_at: string;
    purpose: string;
    remark: string;
    business: Business;
    is_completed: boolean;
    update_url: string;
}
