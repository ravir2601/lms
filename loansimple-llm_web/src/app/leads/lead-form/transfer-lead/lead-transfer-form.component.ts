import { Component, Inject, OnInit } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material";
import { LeadsService } from "../../leads.service";
import { CommonService } from "../../../services/common.service";
import { AddLead } from "../lead-form.model";

@Component({
    selector: 'kt-lead-transfer-form',
    templateUrl: './lead-transfer-form.component.html',
    styleUrls: ['./lead-transfer-form.component.scss']
})
export class LeadTransferFormComponent implements OnInit {
    oldLead: any;
    sheetData: object;

    constructor(private bottomSheetRef: MatBottomSheetRef<LeadTransferFormComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) sheetData,
                private leadsService: LeadsService,
                private commonService: CommonService,
    ) {
        this.sheetData = sheetData;
    }

    ngOnInit() {
        this.oldLead = new AddLead(this.sheetData);
    }


    transferLead(id): void {
            this.leadsService.transferLead(id)
                .subscribe(response => {
                    this.commonService.showToast('A request to transfer this lead has been submitted successfully', 'alert-success');
                    this.bottomSheetRef.dismiss();
                });
    }

    dismiss(): void {
        this.bottomSheetRef.dismiss();
    }

}
