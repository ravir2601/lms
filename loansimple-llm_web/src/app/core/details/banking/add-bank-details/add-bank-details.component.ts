import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Branch, Bank } from './../../../_models/bank.model';
import { CoreService } from './../../../core.service';
import { MatBottomSheetRef } from '@angular/material';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'kt-add-bank-details',
    templateUrl: './add-bank-details.component.html',
    styleUrls: ['./add-bank-details.component.scss']
})
export class AddBankDetailsComponent implements OnInit {
    markBankAsOptions = [
        { key: 'disbursement_bank', value: 'Disbursement Bank' },
        { key: 'pos_collection', value: 'POS Collection' },
        { key: 'nach', value: 'NACH' },
        { key: 'pdc', value: 'PDC' },
        { key: 'security_pdc', value: 'Security PDC' },
    ];

    bankDetails = new Branch();
    bank = new Bank();
    data = {
        id: ''
    };

    constructor(
        private bottomSheetRef: MatBottomSheetRef<AddBankDetailsComponent>,
        private coreService: CoreService,
        private cd: ChangeDetectorRef,
        @Inject(MAT_BOTTOM_SHEET_DATA) public input: any
        ) {
            this.data = input;
        }

    ngOnInit() {}

    getBankDetails(ifsc) {
        this.coreService.getBankByIFSC(ifsc.target.value).subscribe((res: any) => {
            this.bank.ifsc = this.bankDetails.ifsc =  res.IFSC;
            this.bankDetails.name = res.BANK;
            this.bankDetails.branch_name = res.BRANCH;
            this.cd.detectChanges();
        });
    }

    addBank() {
        this.coreService.addBank(this.data.id, this.bank).subscribe(res => {
            this.bottomSheetRef.dismiss({type: 'success', bankName: this.bankDetails.name});
        });
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }
}
