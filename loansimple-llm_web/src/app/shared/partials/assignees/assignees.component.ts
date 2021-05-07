import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-assignees',
  templateUrl: './assignees.component.html',
  styleUrls: ['./assignees.component.scss']
})
export class AssigneesComponent implements OnInit {

  isChange: boolean = false;
  user: string = 'Sachin Choudhary';

  constructor() { }

  ngOnInit() {
  }

  change() {
    this.isChange = true;
  }
  
  userChange() {
    this.user = this.user;
    this.isChange = false;
  }

}
