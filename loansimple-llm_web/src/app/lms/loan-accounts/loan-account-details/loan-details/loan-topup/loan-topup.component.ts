import { Bank, Branch } from './../../../../../core/_models/bank.model';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from './../../../../../services/common.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { LmsService } from '../../../../lms.service';


@Component({
    selector: 'kt-loan-topup',
    templateUrl: './loan-topup.component.html',
    styleUrls: ['./loan-topup.component.scss']
})
export class LoanTopupComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
        private lmsService: LmsService,
        private commonService: CommonService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) { }
    uploadForm: FormGroup;
    public uploader: FileUploader = new FileUploader({});

    public losConstant: any;
    public mobile: string;
    public email: string;
    private bankStatementFile: File = null;
    bankData: any = {business: '', application: '', id: '', bank_statement_files: this.bankStatementFile};
    data: any = {product_type: '' };

    bankList: Bank[];
    bankName: string;
    branch = new Branch();
    selectedBank = new Bank();
    addBank = false;
    bankDetails = new Branch();
    bank = new Bank();

    ngOnInit() {
        this.bankData.business = this.userData.business.id;
        this.bankData.application = this.userData.id;
        this.losConstant = this.lmsService.losConstants;
        this.uploadForm = this.fb.group({
            uploadFile: [null, null]
        });
        this.getBankList();
    }

    getBankList() {
        this.lmsService.getBankDetails(this.userData.id).subscribe((res: any) => {
            this.bankList = res.results;
            if (this.bankList.length !== 0) {
                this.bankName = this.bankName ? this.bankName : this.bankList[0].branch.name;
                this.getSelectedBankDetails(this.bankName);
            } else {
                this.branch = new Branch();
            }
        });
    }

    getSelectedBankDetails(bankName) {
        this.bankName = bankName;
        this.selectedBank = this.bankList.find(res => res.branch.name === bankName);
        this.branch = this.selectedBank.branch;
        // this.getBankStatement(this.selectedBank.update_url);
        // this.files = [];
        this.cd.detectChanges();
    }

    openBankForm() {
        this.addBank = true;
    }

    getBankDetails(ifsc) {
        this.lmsService.getBankByIFSC(ifsc.target.value).subscribe((res: any) => {
            this.bank.ifsc = this.bankDetails.ifsc =  res.IFSC;
            this.bankDetails.name = res.BANK;
            this.bankDetails.branch_name = res.BRANCH;
            this.cd.detectChanges();
        });
    }

    saveBank() {
        this.lmsService.addBank(this.userData.id, this.bank).subscribe(res => {
            this.bankName = this.bankDetails.name;
            this.addBank = false;
            this.getBankList();
            this.cd.detectChanges();
        });

    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

    selectFile(files) {
        this.bankStatementFile = files[0];
        this.bankData.bank_statement_files = this.bankStatementFile;
    }

    makeLoanData(event, key) {
        this.data[key] = event.target.value;
    }

    submitRequest() {
        this.bankData.id = this.selectedBank.id;
        this.data.bank = this.bankData;
        this.lmsService.addLoanTopup(this.data, this.userData.id).subscribe(res => {
            this.bottomSheetRef.dismiss('success');
        },
            err => {
                this.commonService.showError(err.error);
            }
        );
    }
}
