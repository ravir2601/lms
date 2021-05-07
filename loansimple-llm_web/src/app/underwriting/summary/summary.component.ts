import {Component, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {UnderwritingService} from '../underwriting.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'kt-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

    public applicationData = {};
    public karzaData = {};
    public leadId = 0;

    public overall = {
        value: 'Calculating',
        class: 'warning'
    };

    public upiChartData: ChartDataSets[] = [
        {data: [], label: 'PayTM'},
        {data: [], label: 'Amazon'},
        {data: [], label: 'PhonePe'},
        {data: [], label: 'Google'},
    ];
    public upiChartLabels: Label[] = [];
    public upiData = [];

    public creditsChartLabels: Label[] = [];
    public creditsChartData: ChartDataSets[] = [
        {data: [], label: 'Cash'},
        {data: [], label: 'Others'},
    ];
    public creditsData = [];

    public fakeUtrs = [
        'BARBT19274483343', 'N282190299245286', 'CBINH19276171587', 'N304190310479797', 'KKBKH19287799891',
        'KKBKH19296684876', 'KKBKH19294686652', 'BKIDN19278342764', 'BKIDN19298491603', 'KKBKH19282857939',
        'IBKL191018161869', 'KKBKH19291744440', 'KKBKH19280636141', 'KKBK192832237533', 'N282190299197476',
    ].sort(() => {
        return .5 - Math.random();
    });

    public bureauData = {};
    public bureauTab = 'cibil_data';
    public karzaVerified = false;

    public summary = {
        ls_score: 0,
        repayment: 0,
        default: 0,
    };

    public lineChartOptions = {
        responsive: true,
        gridLines: {
            display: false
        }
    };
    public lineChartColors: Color[] = [
        {backgroundColor: '#4FB9ED'},
        {backgroundColor: '#5F42B0'},
        {backgroundColor: '#EE9B3A'},
        {backgroundColor: '#58A55C'},
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [];

    constructor(
        private underwritingService: UnderwritingService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.getData();
    }

    ngOnInit() {
    }

    getData() {
        this.route.params.subscribe(params => {
            this.underwritingService.getApplication(params.id).subscribe(response => {
                this.applicationData = response;
                this.leadId = response.business.lead;
                this.getSummary();
                this.getKarzaData();
            });
        });
    }

    getKarzaData() {
        const keys = [];
        const mappings = {
            karza_aadhar_address: 'karza_lead_aadhar_ocr_info',
            karza_lead_pan_info: 'karza_lead_pan_info',
            karza_lead_pan_ocr_info: 'karza_lead_pan_ocr_info'
        };
        this.underwritingService.getKarzaData(this.leadId).subscribe(response => {
            this.karzaData = this.keyValue(response.results, 'key', 'value');
            Object.entries(mappings).forEach(([key, val]) => {
                if (this.karzaExists(key) === false) {
                    keys.push(val);
                }
            });
            if (!this.karzaVerified) {
                this.karzaVerification(keys);
            }
            this.setColor();
        });
    }

    karzaExists(key) {
        if (!this.karzaData[key] || Object.keys(this.karzaData[key]).length === 0) {
            return false;
        }
        return true;
    }

    setColor() {
        this.overall.value = 'Green';
        if (this.karzaData['karza_aadhar_address_match_percentage'] < 75 || this.karzaData['karza_aadhar_name_match_percentage'] < 75) {
            this.overall = {value: 'Yellow', class: 'warning'};
        }
        if (this.summary.repayment < 180) {
            this.overall = {value: 'Yellow', class: 'warning'};
        }
        if (this.karzaData['karza_aadhar_name_match_percentage'] < 30) {
            this.overall = {value: 'Red', class: 'danger'};
        }
    }

    keyValue(arr, key, value): {} {
        const data = {};
        arr.forEach(obj => {
            let values = {};
            if (typeof(value) === 'string') {
                // obj[value] =  obj[value].replace(/\'/g, '"');
                try {
                    values = JSON.parse(obj[value]);
                } catch {
                    values = obj[value];
                }
            } else {
                value.forEach(el => {
                    try {
                        values[el] = JSON.parse(obj[el]);
                    } catch {
                        values[el] = obj[el];
                    }
                });
            }
            data[obj[key]] = values;
        });
        return data;
    }

    karzaVerification(actions) {
        this.underwritingService.karzaVerification(this.leadId, actions).subscribe(response => {
            this.karzaVerified = true;
            this.getKarzaData();
        });
    }

    getSummary() {
        this.route.params.subscribe(params => {
            this.underwritingService.getSummary(params.id).subscribe(response => {
                this.bureauData = response;
                this.summary.ls_score = response.ls_score;
                this.summary.repayment = this.setRepayment(response.cibil_data.score);
                this.summary.default = this.setDefaultPercentage({
                    cibil_score: parseInt(response.cibil_data.score, 10),
                    experian_score: parseInt(response.experian_data.score, 10),
                    cibil_enquiries: response.cibil_data.total_enquiry,
                    experian_enquiries: response.experian_data.total_enquiry,
                });
                if (response.bank_statement_data) {
                    this.setCredits(response.bank_statement_data);
                }
            });
        });
    }

    setUpiData(data) {
        const temp = [];
        const upi = [];
        Object.entries(data).forEach(([month, row]) => {
            temp[month] = row;
        });

        Object.keys(temp).sort().reverse().forEach((key) => {
            upi[key] = temp[key];
        });

        let paytm = [];
        let amazon = [];
        let phonepe = [];
        let google = [];
        Object.entries(upi).forEach(([month, arr]) => {
            if (this.upiChartLabels.length < 6) {
                this.upiChartLabels.push(month);
                this.upiData.push({month, count: arr['count'], amount: arr['sum']});
                paytm.push((arr['sum'] * 0.17).toFixed(2));
                amazon.push((arr['sum'] * 0.09).toFixed(2));
                phonepe.push((arr['sum'] * 0.47).toFixed(2));
                google.push((arr['sum'] * 0.27).toFixed(2));
            }
        });
        this.upiChartLabels = this.upiChartLabels.reverse();
        paytm = paytm.reverse();
        amazon = amazon.reverse();
        phonepe = phonepe.reverse();
        google = google.reverse();
        const base = this.summary.repayment / 100;
        this.upiChartData = [
            {data: amazon, label: 'Amazon'},
            {data: paytm, label: 'PayTM'},
            {data: google, label: 'Google'},
            {data: phonepe, label: 'PhonePe'},
        ];
    }

    setDefaultPercentage(data): number {
        let perc = (((data.cibil_score + data.experian_score) / 2) + 900) / 900;
        if (data.cibil_enquiries > 10) {
            perc = 1 + (((data.cibil_enquiries - 10) / 10) * perc);
        } else if (data.experian_enquiries > 10) {
            perc = 1 + (((data.experian_enquiries - 10) / 10) * perc);
        }
        return parseFloat(perc.toFixed(1));
    }

    setCredits(data) {
        const temp = [];
        const credits = [];
        if (data.upi) {
            this.setUpiData(data.upi);
        }
        Object.entries(data).forEach(([type, arr]) => {
            Object.entries(arr).forEach(([month, row]) => {
                if (!temp[month]) {
                    temp[month] = [];
                }
                temp[month][type] = row;
            });
        });
        Object.keys(temp).sort().reverse().forEach((key) => {
            credits[key] = temp[key];
        });
        this.createCreditChart(credits);
    }

    createCreditChart(credits) {
        const cash = [];
        const others = [];
        Object.entries(credits).forEach(([month, arr]) => {
            let count = 0;
            let amount = 0;
            if (this.creditsChartLabels.length < 6) {
                this.creditsChartLabels.push(month);
                if (credits[month].cash) {
                    amount += credits[month].cash.sum;
                    count += credits[month].cash.count;
                    cash.push(credits[month].cash.sum);
                } else {
                    cash.push(0);
                }
                if (credits[month].other) {
                    amount += credits[month].other.sum;
                    count += credits[month].other.count;
                    others.push(credits[month].other.sum);
                } else {
                    others.push(0);
                }
                this.creditsData.push({month, count, amount});
            }
        });
        this.creditsChartData = [
            {data: cash, label: 'Cash'},
            {data: others, label: 'Others'},
        ];
    }

    setRepayment(score) {
        return Math.round((256 * score) / 900);
    }

    setBureauTab(tab) {
        this.bureauTab = tab;
    }

    // 1. PAN Photo to Person Photo - karza_lead_selfie_pan_face_match_info
    // 2. Aadhaar Photo to Person Photo - karza_lead_selfie_aadhar_face_match_info
    // 3. PAN DOB to DOB provided - karza_lead_pan_info
    // 4. PAN Status - karza_lead_pan_info
    // 5. Address provided to Aadhaar Address Match %
    // 6. Latest address in CIBIL with date + Address Match%
    // 7. Latest address in Experian with date + Address Match%
    // 8. Hunter Trigger Counts

}
