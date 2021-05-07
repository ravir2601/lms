import { Component, Inject, OnInit } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { FiService } from "../../fi.service";
import { CommonService } from "../../../services/common.service";

@Component({
    selector: 'kt-fi-task-details',
    templateUrl: './fi-task-details.component.html',
    styleUrls: ['./fi-task-details.component.scss']
})
export class FiTaskDetailsComponent implements OnInit {
    task_id = '';
    updated_data: object = {};
    data: any;
    fiConstants : any;
    private file: File = null;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) sheetData,
        private route: ActivatedRoute,
        private bottomSheet: MatBottomSheet,
        private fiService: FiService,
        private bottomSheetRef: MatBottomSheetRef<FiTaskDetailsComponent>,
        private commonService: CommonService,
    ) {
        this.data = sheetData.data;
    }

    ngOnInit() {
        this.fiService.getFiConstants().subscribe(res => {
            this.fiConstants = res;
        });
        this.updated_data = {
            'file' : this.data.file,
            'result' : this.data.result,
            'remark' : this.data.remark,
            'update_url' : this.data.update_url,
        }
    }
    private formData: FormData = new FormData();

    selectFile(files) {
        if(files.length){
            for(let i=0 ; i < files.length ; i++)
                this.formData.append('files', files[i], files[i].name);
        }
    }

    submitRequest() {
        for (const key in this.updated_data) {
            if(key !== 'file') {
                this.formData.append(key, this.updated_data[key]);
            }
        }
        this.fiService.updateFiDetails(this.updated_data, this.formData).subscribe(res => {
                this.data = res;
                this.commonService.showToast('Task has been updated successfully', 'alert-success');
                this.bottomSheetRef.dismiss(res);
            },
            err => {
                this.commonService.showError(err.error);

            }
        );
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }
}
