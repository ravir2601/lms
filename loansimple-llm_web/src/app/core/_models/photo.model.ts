import { Issue } from './issue.model';
export class Photo {
    tag: string;
    update_url: string;
    file: string;
    lat: number;
    long: number;
    doc_issues: Issue[];
    doc_histories: Photo[];

    files: [];
}
