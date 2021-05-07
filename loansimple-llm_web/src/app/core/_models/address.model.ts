import { Issue } from './issue.model';
import { Extra } from './extra.model';
export class Address {
    address_type: string;
    ownership: string;
    residing_since: string;
    address_line: string;
    landmark: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    region: number;
    doc_issues: Issue[];
    doc_histories: Address[];
    common_data: Extra[];

    doc_type: string;
    doc_name: string;
    file: string;

    is_primary: boolean;
    is_same_as_permanent: boolean;
    is_same_as_registered: boolean;
    is_current_residence_address: boolean;

    update_url: string;
}
