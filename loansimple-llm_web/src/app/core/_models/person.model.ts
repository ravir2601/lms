import { Contact } from './contact.model';
import { Document } from './document.model';
import { Financial } from '../../applications/_models/financial.model';
import { Extra } from './extra.model';

export class BusinessPerson {
    id: number;
    business_id: number;
    is_primary: boolean;
    person: Person;
    name: string;
    position: string;
    primary_person: PrimaryPerson;
    extra: Extra;
    update_url: string;
}

export class PrimaryPerson {
    person: Person;
}

export class Person {
    update_url: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    full_name: string;
    dob: string;
    gender: string;
    primary_mobile: Contact;
    primary_email: Contact;
    pan_card: Document;
    aadhaar_card: Document;
    common_data: Extra[];
    financial: Financial;
    display_name: string;
}
