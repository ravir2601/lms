import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'kt-filter-search',
    templateUrl: './filter-search.component.html',
    styleUrls: ['./filter-search.component.scss'],
})
export class FilterSearchComponent implements OnInit {

    @Input() searchModel;

    @Output() searchModelChange: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    updateSearchModel(value) {
        this.searchModel = value;
        this.searchModelChange.emit(this.searchModel);
    }
}
