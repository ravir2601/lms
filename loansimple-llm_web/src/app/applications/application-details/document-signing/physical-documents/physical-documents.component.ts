import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'kt-physical-documents',
    templateUrl: './physical-documents.component.html',
    styleUrls: ['./physical-documents.component.scss']
})
export class PhysicalDocumentsComponent implements OnInit {
    @Input() verification = false;
    documents = [
        {
            title: 'Signing Photo',
            upload: false, generated: true, signed: false, regenerate: false
        },
        {
            title: 'Sanction Letter',
            upload: false, date: true, placeholder: 'Generated At', generated: true, signed: false, regenerate: true
        },
        {
            title: 'Undertaking',
            upload: true, generated: true, signed: true, regenerate: true
        },
        {
            title: 'Loan Agreement',
            upload: true, generated: true, signed: true, regenerate: true
        },
        {
            title: 'Insurance Agreement',
            upload: true, generated: true, signed: true, regenerate: true
        }
    ];
    constructor() { }

    ngOnInit() {
    }

}
