export class NachDepositedList {
    id: number;
    nbfc: object;
    deposited_date: string;
    generated_file: string;
    nach_count: number
    amount: number;
    files: any;

    constructor(data?) {
        this.id = data.id || '';
        this.nbfc = data.nbfc ? data.nbfc.name : '';
        this.deposited_date = data.deposited_date || '';
        this.generated_file = data.generated_file || '';
        this.nach_count = data.nach_count || '';
        this.amount = data.amount || '';
        this.files = data.files;
    }
}
