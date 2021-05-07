import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'kt-action-histories',
  templateUrl: './action-histories.component.html',
  styleUrls: ['./action-histories.component.scss']
})
export class ActionHistoriesComponent implements OnInit {
  @Input() actionHistoriesList: any;
  @Input() pageNumber: number;

  constructor() { }

  ngOnInit() {
  }

  openMap(user) {
    if (user.lat && user.long) window.open('https://www.google.com/maps/preview/?q=' + `${user.lat},${user.long}`, '_blank')
  }
}
