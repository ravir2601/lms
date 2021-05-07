import { ERROR_KEY } from '../../../../../constants/error-message'
import { CommonService } from './../../../../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { LmsService } from '../../../../lms.service'


@Component({
    selector: 'kt-nach-request',
    templateUrl: './nach-request.component.html',
    styleUrls: ['./nach-request.component.scss']
})
export class NachRequestComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        private datePipe: DatePipe,
        @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
        private lmsService: LmsService,
        private commonService: CommonService,
    ) { }

    public amount: string;
    public date: string;
    public comment: string;

    ngOnInit() {
        console.log(this.userData);
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

    submitRequest() {
        let payload = {
            "payment_mode": "nach",
            "is_nach_manual": true,
            "total_expected": this.amount,
            "date": this.datePipe.transform(this.date, 'yyyy-MM-dd'),
            "comment": this.comment
        }
        this.lmsService.addNachRequest(payload, this.userData.id).subscribe(res => {
            this.bottomSheetRef.dismiss('success');
        },
            err => {
                this.commonService.showError(err.error);

            }
        );
    }

}
