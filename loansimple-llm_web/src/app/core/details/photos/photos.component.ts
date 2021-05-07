import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from '../../core.service';
import { CommonService } from '../../../services/common.service';
import { ConstantService } from '../../../services/constant.service';
import { Photo } from '../../_models/photo.model';
import { Constant } from '../../_models/constant.model';
import { MatBottomSheet } from '@angular/material';
import { IssueFormCompoment } from '../../_partials/issue-form/issue-form.component';
import { Issue } from '../../_models/issue.model';
import { ApplicationsService } from '../../../applications/applications.service';

@Component({
    selector: 'kt-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
    id = 0;
    businessId = 0;
    photoTypes: Constant[];
    photos: Photo[];
    photoMap = {};
    preview: Photo;
    extra = {};
    extraMap = {};
    loading = {};

    constructor(
        private route: ActivatedRoute,
        private coreService: CoreService,
        private applicationsService: ApplicationsService,
        private commonService: CommonService,
        private constantService: ConstantService,
        private bottomSheet: MatBottomSheet
    ) {
        this.id = parseInt(route.parent.snapshot.paramMap.get('id'), 10);
        this.getPhotoTypes();
        this.getApplication();
    }

    ngOnInit() {
    }

    getApplication() {
        this.applicationsService.getApplication(this.id).subscribe(res => {
            this.businessId = res.business.id;
            this.getPhotos();
            this.getBusinessExtra();
        });
    }

    getBusinessExtra() {
        this.coreService.getBusinessExtra(this.businessId).subscribe(res => {
            this.extra = this.commonService.objectify(res.results);
            this.extraMap = {
                selfie_with_the_owner: [
                    this.extra['pan_with_selfie_with_owner_photo_match'],
                    this.extra['profile_with_selfie_with_owner_photo_match'],
                    this.extra['aadhaar_with_selfie_with_owner_photo_match']
                ]
            };
        });
    }

    getPhotoTypes() {
        const key = 'business_photo_tags';
        this.constantService.constants_subject.subscribe(res => {
            this.photoTypes = res[key];
        });
    }

    getPhotos() {
        this.coreService.getBusinessPhotos(this.businessId).subscribe(res => {
            this.photos = res.results;
            this.parsePhotos(this.photos);
        });
    }

    parsePhotos(photos: Photo[]) {
        this.photoMap = {};
        photos.forEach(photo => {
            if (!this.preview) {
                this.preview = photo;
            }
            if (!this.photoMap[photo.tag]) {
                this.photoMap[photo.tag] = [];
            }
            this.photoMap[photo.tag].push(photo);
        });
    }

    uploadPhoto(tag, files) {
        this.loading[tag] = true;
        this.coreService.uploadBusinessPhotos(this.businessId, tag, files).subscribe(res => {
            this.loading[tag] = false;
            if (!this.photoMap[tag]) {
                this.photoMap[tag] = [];
            }
            res.forEach(row => {
                this.photoMap[tag].push(row);
            });
            this.preview = res[0];
        });
    }

    getDate(): Date {
        return new Date();
    }

    issueForm() {
        this.bottomSheet.open(IssueFormCompoment, {
            data: {
                rootUrl: this.preview.update_url
            }
        }).instance.saved.subscribe(res => {
            this.preview.doc_issues.push(res);
        });
    }

    updateIssue(issue: Issue, index) {
        this.commonService.confirm('Do you really want to resolve this issue?', () => {
            const next = {
                pending: 'uploaded',
                commited: 'uploaded',
                uploaded: 'approved'
            };
            this.coreService.updateIssue(issue.update_url, { status: next[issue.status] }).subscribe(res => {
                this.preview.doc_issues[index] = res;
                this.commonService.showToast('The issue has been updated successfully', 'alert-success');
            });
        });
    }

    delete() {
        this.commonService.confirm('Do you rellay want to delete this photo?', () => {
            this.coreService.delete(this.preview.update_url).subscribe(res => {
                this.commonService.showToast('The photo was deleted successfully', 'alert-success');
                this.preview = null;
                this.getPhotos();
            });
        });
    }

}
