import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Address } from '../../_models/address.model';
import { Region } from '../../_models/region.model';
import { UnrService } from '../../../unr/unr.service';
import { ConstantService } from '../../../services/constant.service';
import { CommonService } from '../../../services/common.service';
import { CoreService } from '../../core.service';
import { config } from 'rxjs';
import { Extra } from '../../_models/extra.model';

@Component({
    selector: 'kt-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
    @Input() rootUrl: string;
    @Input() businessId: number;
    @Input() title: string;
    @Input() addressType: string;
    @Input() address: Address;
    @Input() same: string;
    @Input() residingSince: boolean;
    @Input() isCurrentAddress: boolean;
    @Output() saved = new EventEmitter<boolean>();
    today = new Date();
    extras: Extra[];
    safe = [
        'address_type',
        'address_line',
        'ownership',
        'locality',
        'city',
        'state',
        'pincode',
        'region',
        'is_primary',
        'is_current_residence_address',
        'is_same_as_permanent',
        'is_same_as_registered',
        'residing_since'
    ];
    data = new Address();
    states: Region[];
    cities: Region[];
    regions: Region[];

    mode = 'createAddress';

    constructor(
        private constantService: ConstantService,
        private commonService: CommonService,
        private coreService: CoreService,
    ) {
    }

    ngOnInit() {
        if (this.address) {
            this.data = this.address;
            this.extras = this.address.common_data;
            this.rootUrl = this.address.update_url;
            this.mode = 'updateAddress';
        } else {
            this.rootUrl += 'addresses/';
        }
        this.data.address_type = this.addressType;
        this.getStates();
    }

    saveData() {
        this.data.residing_since = this.commonService.parseDate(this.data.residing_since);
        const data = this.commonService.filterSafe(this.data, this.safe);
        this.coreService[this.mode](this.rootUrl, data).subscribe(res => {
            this.commonService.showToast('The address was saved successfully', 'alert-success');
            this.saved.emit();
        });
    }

    deleteData(url) {
        this.commonService.confirm('Do you really want to delete this address?', () => {
            this.coreService.delete(url).subscribe(res => {
                this.commonService.showToast('The address was deleted successfully', 'alert-success');
                this.saved.emit();
            });
        });
    }

    getStates() {
        this.constantService.states_subject.subscribe(res => {
            this.states = res;
            if (this.data.city) {
                this.getSubRegions('city', this.data.state);
            }
        });
    }

    getSubRegions(type, state) {
        const types = {
            city: 'cities',
            locality: 'regions'
        };
        this.constantService.getSubRegions(type, state).subscribe(res => {
            this[types[type]] = res.results;
            if (type === 'city') {
                this.getSubRegions('locality', this.data.city);
            }
        });
    }

}
