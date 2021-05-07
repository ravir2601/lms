export class MenuConfig {
    public defaults: any = {
        header: {
            self: {},
            items: [
                {
                    title: 'Applications',
                    root: true,
                    alignment: 'left',
                    page: '/applications',
                },
                {
                    title: 'Loan Accounts',
                    root: true,
                    alignment: 'center',
                    toggle: 'click',
                    page: '/lms/loan-accounts',
                },
                {
                    title: 'FI',
                    root: true,
                    alignment: 'center',
                    toggle: 'click',
                    page: '/fi/tasks',
                },
                {
                    title: 'UNR',
                    root: true,
                    alignment: 'left',
                    toggle: 'click',
                    submenu: [
                        {
                            title: 'Users',
                            icon: 'flaticon-users',
                            page: '/unr/users',
                            key: 'can_view__web__users_tab',
                        },
                        {
                            title: 'Functionalities',
                            icon: 'flaticon-laptop',
                            page: '/unr/functionalities',
                            key: 'can_view__web__functionality_tab',
                        },
                        {
                            title: 'Regions',
                            icon: 'flaticon-email',
                            page: '/unr/regions',
                            key: 'can_view__web__regions_tab',
                        },
                    ]
                },
                {
                    title: 'Accounting',
                    root: true,
                    alignment: 'left',
                    toggle: 'click',
                    submenu: [
                        {
                            title: 'PTPs',
                            icon: 'flaticon-like',
                            page: '/lms/ptp',
                        },
                        {
                            title: 'PDC',
                            icon: 'flaticon-email',
                            page: '/lms/pdc',
                        },
                        {
                            title: 'Cash',
                            icon: 'flaticon-coins',
                            page: '/lms/cash',
                        },
                        {
                            title: 'Cheque Requests',
                            icon: 'flaticon-email',
                            page: '/lms/cheque_requests',
                        },
                        {
                            title: 'NEFT',
                            icon: 'flaticon-browser',
                            page: '/lms/neft',
                        },
                        {
                            title: 'Manual NACH',
                            icon: 'flaticon-globe',
                            page: '/lms/nach/requested',
                        },
                        {
                            title: 'eNACH',
                            icon: 'flaticon-globe',
                            page: '/lms/enach/requested',
                        },
                    ]
                }
            ]
        },
    };

    public get configs(): any {
        return this.defaults;
    }
}
