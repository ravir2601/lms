import { Issue } from './issue.model';
import { User } from './user.model';
export class Document {
    doc_type: string;
    doc_name: string;
    doc_number: string;
    display_name: string;
    update_url: string;
    file: string;
    doc_issues: Issue[];
    doc_histories: Document[];
    created_by: User;

    files: [];

    score: number;
    enquiries: number;
    date: string;
    is_to_include: boolean;
}
