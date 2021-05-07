import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CoreService } from '../../core.service';
import { Person, BusinessPerson } from '../../_models/person.model';
import { Constant } from '../../_models/constant.model';
import { CommonService } from '../../../services/common.service';
import { ConstantService } from '../../../services/constant.service';
import { Photo } from '../../_models/photo.model';
import { FormCanDeactivate } from '../../deactivate/form-can-deactivate';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'kt-person-basic-form',
    templateUrl: './person-basic-form.component.html',
    styleUrls: ['./person-basic-form.component.scss']
})
export class PersonBasicFormComponent extends FormCanDeactivate implements OnInit, OnChanges {
    @Input() personUrl: string;
    @Input() businessPerson: BusinessPerson;
    @Input() extra;
    data: Person;
    files: File[];
    photo: Photo;
    safe = ['first_name', 'middle_name', 'last_name', 'dob', 'gender'];
    genders: Constant[];
    designations: Constant[];
    edit = false;
    today = new Date();

    @ViewChild('basicDetailsForm', {static: false})
    form: NgForm;

    constructor(
        private coreService: CoreService,
        private commonService: CommonService,
        private constantService: ConstantService,
    ) {
        super();
        this.getConstants();
    }

    ngOnInit() {
        console.log(this.businessPerson);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getData();
    }

    getData() {
        this.coreService.getPerson(this.personUrl).subscribe(res => {
            this.data = res;
        });
    }

    saveData() {
        console.log(this.businessPerson);
        const data = this.commonService.filterSafe(this.businessPerson, ['position']);
        this.coreService.saveBusinessPerson(this.businessPerson.update_url, data).subscribe(res => {
            this.savePerson();
        });
    }

    savePerson() {
        this.businessPerson.person.dob = this.commonService.parseDate(this.businessPerson.person.dob);
        const data = this.commonService.filterSafe(this.businessPerson.person, this.safe);
        this.coreService.savePerson(this.personUrl, data).subscribe(res => {
            this.data = res;
            this.commonService.showToast('Basic Details were saved successfully', 'alert-success');
        });
    }

    getConstants() {
        this.constantService.constants_subject.subscribe(res => {
            this.genders = res['gender_types'];
            this.designations = res['person_roles'];
        });
    }

    uploadPhoto(files) {
        const url = this.photo ? this.photo.update_url : (this.personUrl + 'photos/');
        this.coreService.uploadPersonPhoto(url, 'profile', files, this.photo ? 'patch' : 'post').subscribe(res => {
            if (Array.isArray(res)) {
                this.photo = res[0];
            } else {
                this.photo = res;
            }
            this.edit = false;
        });
    }

    getDate(): Date {
        return new Date();
    }

}
