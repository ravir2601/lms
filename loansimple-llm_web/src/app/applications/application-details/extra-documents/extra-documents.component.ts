import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { ApplicationsService } from "../../applications.service";
import { CommonService } from "../../../services/common.service";
import { isSuccess } from "angular-in-memory-web-api";

@Component({
    selector: 'kt-extra-documents',
    templateUrl: './extra-documents.component.html',
    styleUrls: ['./extra-documents.component.scss']
})
export class ExtraDocumentsComponent implements OnInit {
    private listData:any = [];
    private losConstant: any;
    private formData: FormData = new FormData();

    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private applicationsService: ApplicationsService,
        private commonService: CommonService,
    ) {
    }

    ngOnInit() {
        this.getLosConstant();
        this.getExtraDocumentsData();
    }

    getExtraDocumentsData() {
        this.applicationsService.getExtraDocuments(this.data.id).subscribe(res => {
            this.listData = res;
        });
    }

    getLosConstant(){
        this.applicationsService.getLosConstants().subscribe(res => {
            this.losConstant = res;
        });
    }

    selectFile(files) {
        if(files.length){
            for(let i=0 ; i < files.length ; i++)
                this.formData.append('files', files[i], files[i].name);
        }
    }
    submitRequest() {
        for (const key in this.data) {
            if(key !== 'file') {
                this.formData.append(key, this.data[key]);
            }
        }
        this.applicationsService.addExtraDocRequired(this.data, this.formData).subscribe(res => {
                this.listData = res;
                this.bottomSheetRef.dismiss('Extra Document Added');
            },
            err => {
                this.commonService.showErrorMsg(err.error);
            }
        );
        this.getExtraDocumentsData();
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }


}
