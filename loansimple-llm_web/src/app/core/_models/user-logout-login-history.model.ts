export class UserLogoutLoginHistory {
    created_at: string;
    updated_at: string;
    action: string;
    datetime: string;
    app_name: string;
    version: string;
    platform: string;
    lat: string;
    long: string;
    os: number;
    id: number;
    vendor: string;
    model: string;
    user: number;

    constructor(user?) {
        this.created_at = user.created_at || '';
        this.updated_at = user.updated_at || '';
        this.action = user.action || '';
        this.datetime = user.datetime || '';
        this.app_name = user.app_name || '';
        this.version = user.version || '';
        this.platform = user.platform || '';
        this.lat = user.lat || '';
        this.long = user.long || '';
        this.os = user.os || '';
        this.id = user.id || '';
        this.vendor = user.vendor || '';
        this.model = user.model || '';
        this.user = user.user || '';
    }
}

