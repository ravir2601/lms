import { User } from './user.model';
export class Issue {
    reason: string;
    remark: string;
    issue_type: string;
    status: string;
    raised_by: User;
    assigned_to: User;
    update_url: string;
}
