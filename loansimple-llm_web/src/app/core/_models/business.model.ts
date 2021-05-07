import { PrimaryPerson, BusinessPerson } from './person.model';
import { User } from './user.model';
import { Address } from './address.model';
import { Financial } from '../../applications/_models/financial.model';
import { environment } from '../../../environments/environment';

export class Business {
    id: number;
    business_id: string;
    name: string;
    primary_person: PrimaryPerson;
    persons: BusinessPerson[];
    addresses: Address;
    extra: BusinessExtra;
    profile_photo: string;
    update_url: string;
    created_at: string;
    business_type: string;
    date_of_incorporation: string;
    business_vertical: string;
    business_model: string;
    number_of_active_years: number;
    financial: Financial;
}

export class BusinessExtra {
    source: string;
    sub_source: string;
    status: string;
    sub_status: string;
    case_owner: User;
    territory_owner: User;
    last_activity_at: string;
}
