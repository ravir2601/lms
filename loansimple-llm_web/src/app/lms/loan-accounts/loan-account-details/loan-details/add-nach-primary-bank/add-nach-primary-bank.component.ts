import { CommonService } from './../../../../../services/common.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { LmsService } from '../../../../lms.service';
import { CoreService } from '../../../../../core/core.service';
import { Bank, Branch } from '../../../../../core/_models/bank.model';

@Component({
    selector: 'kt-add-nach-primary-bank',
    templateUrl: './add-nach-primary-bank.component.html',
    styleUrls: ['./add-nach-primary-bank.component.scss']
})
export class AddNachPrimaryBankComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
        private lmsService: LmsService,
        private commonService: CommonService,
        private coreService: CoreService,
        private cd: ChangeDetectorRef,
    ) { }

    public coreConstant: any;
    public document: File = null;
    public fileName: string;
    public primaryBankDetails: any = {is_for_nach: true};

    bankDetails = new Branch();
    bank = new Bank();

    ngOnInit() {
        this.coreConstant = this.lmsService.coreConstants;
    }

    selectDocument(files) {
        console.log(files[0].name);
        this.document = files[0];
        this.fileName = files[0].name;
    }

    getBankDetails(ifsc) {
        this.coreService.getBankByIFSC(ifsc.target.value).subscribe((res: any) => {
            this.primaryBankDetails.ifsc = this.bank.ifsc = this.bankDetails.ifsc =  res.IFSC;
            this.primaryBankDetails.name = this.bankDetails.name = res.BANK;
            this.primaryBankDetails.branch_name = this.bankDetails.branch_name = res.BRANCH;
            this.cd.detectChanges();
        });
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

    submitRequest() {
        const formData: FormData = new FormData();
        if (this.document != null) {
            formData.append('files', this.document);
        }
        for (const key in this.primaryBankDetails) {
            formData.append(key, this.primaryBankDetails[key]);
        }
        this.lmsService.addNachPrimaryBank(formData, this.userData.id)
        .subscribe(res => {
            this.bottomSheetRef.dismiss('success');
        },
            err => {
                this.commonService.showError(err.error);
            }
        );
    }

}
