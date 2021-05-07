export class unrUsers {
    display_name: string;
    username: string;
    emp_code: string;
    full_name: string;
    mobile: object;
    email: object;
    last_login: string;
    reporting_manager_name: string;
    is_active: boolean;
    id: number;
    password: string;

    constructor(user?) {
        this.display_name = user.display_name || '';
        this.username = user.username || '';
        this.emp_code = user.emp_code || '';
        this.full_name = user.full_name || '';
        this.mobile = user.mobile || '';
        this.email = user.email || '';
        this.last_login = user.last_login || '';
        this.reporting_manager_name = user.reporting_manager ? user.reporting_manager.display_name : '';
        this.is_active = user.is_active || false;
        this.id = user.id || '';
        this.password = user.password || '';
    }
}


