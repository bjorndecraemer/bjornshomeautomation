import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeatingCalendarService implements OnInit {

  $calendarEntries: BehaviorSubject<HeaterCalendarEntry[]> = new BehaviorSubject(null);

  ngOnInit(): void {
    this.$calendarEntries.next(
        [new HeaterCalendarEntry(
            '10:00',
            false,
            HeaterCalendarRepeatableType.Daily,
            null,
            null,
            false,
            22,
            null,
            null),
          new HeaterCalendarEntry(
              '23:00',
              true,
              HeaterCalendarRepeatableType.Weekdays,
              null,
              null,
              false,
              17,
              null,
              null)
        ]);
  }
}
