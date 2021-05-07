import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'kt-field-visit-details',
    templateUrl: './field-visit-details.component.html',
    styleUrls: ['./field-visit-details.component.scss']
})
export class FieldVisitComponent implements OnInit {

    constructor(private bottomSheetRef: MatBottomSheetRef<FieldVisitComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public _data: any) { }

    public listdata: any;
    public data: any;

    ngOnInit() {
        this.data = this._data;
    }

    map_url(url) {
        let mapUrl = "https://www.google.com/maps/preview/" + "?q" + "=" + url.selfie_lat + "," + url.selfie_long;
        return mapUrl;
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

}
