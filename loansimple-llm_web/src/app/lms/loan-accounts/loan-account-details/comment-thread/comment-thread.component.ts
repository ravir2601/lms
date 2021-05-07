import { LmsService } from './../../../lms.service';
import { LMS_URLS } from './../../../../constants/static-urls';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'kt-comment-thread',
    templateUrl: './comment-thread.component.html',
    styleUrls: ['./comment-thread.component.scss']
})
export class CommentThreadComponent implements OnInit {

    constructor(private bottomSheetRef: MatBottomSheetRef<CommentThreadComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
                private lmsService: LmsService,
                private cd: ChangeDetectorRef
                ) { }
    public fileName = 'Choose File';
    public comment: string;
    private baseUrl: string;
    public listData: any;
    private fileData: any;
    private files: any;

    ngOnInit() {
        this.baseUrl = environment.api_host + LMS_URLS.bussiness_details + this.data.id + '/comments/?expand=attachments,user';
        this.loadListData();
        this.cd.detectChanges();
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }
    save() {
        this.fileData = { file: this.files[0], text: this.comment };
        this.lmsService.uploadCommentThreadData1(this.data.id, this.fileData).subscribe((res: any) => {
            this.loadListData();
            this.fileName = 'Choose File';
            this.comment = '';
            this.cd.detectChanges();
        });

    }
    updateFile(files) {
        this.fileName = files[0].name;
        this.files = files;
    }

    loadListData(): void {
        const payloadUrl = this.baseUrl;
        this.lmsService.getLoanAccountDetails(payloadUrl).subscribe((res: any) => {
            this.listData = res;
        });
    }
    onNavigate(url) {
        window.open(url, '_blank');
    }

}
