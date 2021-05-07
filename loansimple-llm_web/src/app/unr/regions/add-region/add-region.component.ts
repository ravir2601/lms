import { CommonService } from './../../../services/common.service';
import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, Inject } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material";
import { UnrService } from "../../unr.service";
import { AuthNoticeService } from "../../../core/auth";
import { environment } from "../../../../environments/environment";
import { UNR_URLS } from "../../../../app/constants/static-urls";

import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject, merge } from "rxjs";
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map
} from "rxjs/operators";

@Component({
    selector: "kt-add-region",
    templateUrl: "./add-region.component.html",
    styleUrls: ["./add-region.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AddRegionComponent implements OnInit {
    public name: string;
    public pincode: string;
    public regionTypeList: object;
    public regionType: string;
    public belongsToLocation: string;
    public belongsToLocationId: number;
    public isRegionApproved: string = "not_approved";
    public kyc_pincode: string;
    public showBelongsToLocation: boolean = false;
    public belongsToLocationList = [];
    public belongsToLocationUrl = environment.api_host + UNR_URLS.regions + "?expand=belongs_to";
    public currentPageIndex: number = 1;
    public searchValue: string;
    public unapprovedReason: any;

    @ViewChild("instance", { static: true }) instance: NgbTypeahead;
    @ViewChild('focusToInput', { static: true }) focusToInput: ElementRef
    focus$ = new Subject<string>();
    click$ = new Subject<string>();
    kycPincodeList = ['No results found'];

    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        private unrService: UnrService,
        private authNoticeService: AuthNoticeService,
        private commonService: CommonService,
        @Inject(MAT_BOTTOM_SHEET_DATA) public infoDataSet: any,
    ) { }

    ngOnInit() {
        this.regionTypeList = this.unrService.unr_constants.region_types;
        this.loadInitialBelongsToLocationData();
        this.evaluteRequest();
    }

    evaluteRequest() {
        if (this.infoDataSet.actionType === 'UPDATE') {
            this.name = this.infoDataSet.info.name;
            this.regionType = this.infoDataSet.info.type;
            this.pincode = this.infoDataSet.info.pincode;
            // this.kycPincodeList = this.infoDataSet.info.kyc_pincodes || [];
            this.belongsToLocation = this.infoDataSet.info.belongs_to && this.infoDataSet.info.belongs_to.name;
            this.isRegionApproved = this.infoDataSet.info.is_approved ? 'approved' : 'not_approved';
            this.unapprovedReason = this.infoDataSet.info.unapproved_reason;
            if(this.infoDataSet.info.kyc_pincodes.length > 0){
                this.kycPincodeList = this.infoDataSet.info.kyc_pincodes;
            }
        }
    }

    dismiss(): void {
        this.bottomSheetRef.dismiss();
    }

    assignRegion() {
        let userPayload = {
            is_for_add: true,
            name: this.name,
            type: this.regionType,
            pincode: this.pincode,
            belongs_to: this.belongsToLocationId,
            kyc_pincodes: this.kycPincodeList,
            is_approved: this.isRegionApproved === "approved" ? true : false
        };

        if (this.isRegionApproved === "not_approved")
            userPayload["unapproved_reason"] = this.unapprovedReason;

        if (this.infoDataSet.actionType === 'ADD') {
            this.addNewRegion(userPayload);
        } else if (this.infoDataSet.actionType === 'UPDATE') {
            this.updateNewRegion(userPayload);
        }
    }

    addNewRegion(userPayload) {
        this.unrService.addNewRegion(userPayload).subscribe((data: any) => {
            this.commonService.showToast('Added successfully', 'alert-success');
            this.bottomSheetRef.dismiss('sucess');
            this.infoDataSet = data;
        }, err => {
            if (err.error && err.error.name) {
                this.authNoticeService.setNotice(
                    "Name and Type field is required.",
                    "danger"
                );
            }
        });
    }

    updateNewRegion(userPayload) {
        this.unrService.updateNewRegion(userPayload, this.infoDataSet.info.id).subscribe((data: any) => {
            this.commonService.showToast('Update successfully', 'alert-success');
            this.bottomSheetRef.dismiss('sucess');
            this.infoDataSet = data;
        }, err => {
            if (err.error && err.error.name) {
                this.authNoticeService.setNotice(
                    "Name and Type field is required.",
                    "danger"
                );
            }
        });
    }

    loadInitialBelongsToLocationData() {
        this.unrService
            .getNextPageData(
                this.belongsToLocationUrl,
                this.currentPageIndex,
                15,
                this.searchValue
            )
            .subscribe((res: any) => {
                if (res.results && res.results.length > 0) {
                    this.belongsToLocationList = res.results;
                }
            });
    }

    searchBelongsToLocation(ev) {
        this.searchValue = ev.target.value;
        this.currentPageIndex = 0;
        this.unrService
            .getNextPageData(
                this.belongsToLocationUrl,
                this.currentPageIndex,
                15,
                this.searchValue
            )
            .subscribe((res: any) => {
                if (res.results && res.results.length > 0) {
                    this.belongsToLocationList = res.results;
                }
            });
    }

    showlistPopover() {
        this.showBelongsToLocation = !this.showBelongsToLocation;
    }

    getNextBelongsToLocationData() {
        this.currentPageIndex += 1;
        this.unrService
            .getNextPageData(
                this.belongsToLocationUrl,
                this.currentPageIndex,
                15,
                this.searchValue
            )
            .subscribe((res: any) => {
                if (res.results && res.results.length > 0) {
                    this.belongsToLocationList.push(...res.results);
                }
            });
    }

    saveCurrentBelongsToLocation(data) {
        this.belongsToLocation = `${data.name}(${
            data.type
            }) - ${data.belongs_to && data.belongs_to.name}`;
        this.belongsToLocationId = data.id;
        this.showlistPopover();
    }

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
        const clicksWithClosedPopup$ = this.click$.pipe(
            filter(() => !this.instance.isPopupOpen())
        );
        const inputFocus$ = this.focus$;
        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term =>
                (term === ""
                    ? this.kycPincodeList
                    : this.kycPincodeList.filter(
                        v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
                    )
                )
            )
        );
    };

    addKycPincode(ev) {
        let tempPinCode = ev.target.value;
        if (this.kycPincodeList[0] === 'No results found' || this.kycPincodeList[0] === 'None') this.kycPincodeList[0] = tempPinCode;
        if (this.kycPincodeList.length > 0 && tempPinCode.length > 0) this.addKycPincodeInList(tempPinCode);
    }

    addKycPincodeInList(value) {
        if (this.kycPincodeList.indexOf(value) === -1) {
            this.kycPincodeList.push(value);
        }
        this.kyc_pincode = '';
    }

    addKycPincodeFromDropDown(ev) {
        if (ev.item === 'No results found') {
            ev.preventDefault();
        } else {
            this.addKycPincodeInList(ev.item);
        }
    }

    deleteKycPinCode(index) {
        this.kycPincodeList.splice(index, 1);
        if(this.kycPincodeList.length === 0) {
            this.kycPincodeList = ['No results found'];
        }
    }

    focusToKycInput() {
        setTimeout(() => {
            this.focusToInput.nativeElement.focus();
        }, 0);
    }

    ngOnDestroy() {
        this.authNoticeService.setNotice(null);
    }
}
