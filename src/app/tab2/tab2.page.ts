import {Component} from '@angular/core';
import {HeatingCalendarService} from '../heater/calendar/services/heating-calendar.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public heatingCalendarService: HeatingCalendarService) {}

}
