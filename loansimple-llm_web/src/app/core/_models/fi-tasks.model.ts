import { PrimaryPerson } from "./person.model";

export class FiTasks {
    id: number;
    task_id: string;
    business: object;
    assigned_to: object;
    raised_by: object;
    created_at: string;
    status: string;
    update_url: string;

    constructor(data?) {
        this.id = data.id || '';
        this.task_id = data.task_id || '';
        this.business = data.business ? new Business(data.business) : {};
        this.assigned_to = data.assigned_to ? new AssignedTo(data.assigned_to) : {};
        this.raised_by = data.raised_by ? new RaisedBy(data.raised_by) : {};
        this.created_at = data.created_at || '';
        this.status = data.status || '';
        this.update_url = data.update_url || '';
    }
}

class Business {
    id: number;
    name: string;
    primary_person: object;
    constructor(business?) {
        business = business || {};
        this.id = business.id || 0;
        this.name = business.name || 0;
        this.primary_person = business.primary_person ? new Person(business.primary_person) : {};
    }
}

class Person {
    full_name: string;
    mobile: object;
    constructor(person?) {
        person = person || {};
        this.full_name = person.person.full_name || '';
        this.mobile = person.person.primary_mobile ? new Mobile(person.person.primary_mobile) : {};
    }
}

class Mobile {
    mobile: number;
    constructor(mobile?) {
        mobile = mobile || {};
        this.mobile = mobile.detail || '';
    }
}

class AssignedTo {
    display_name: string;
    constructor(assignedTo?) {
        assignedTo = assignedTo || {};
        this.display_name = assignedTo.display_name || '';
    }
}

class RaisedBy {
    display_name: string;
    constructor(raisedBy?) {
        raisedBy = raisedBy || {};
        this.display_name = raisedBy.display_name || '';
    }
}
