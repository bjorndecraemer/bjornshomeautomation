import {Component, OnInit} from '@angular/core';
import {HeatingService} from "./heater/services/heating.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  private knobValues = 0;
  private knobLabel = 'Off';
  private sliderBadgeColor = 'danger';

  ngOnInit(): void {
    this.heatingService.refreshData();
    this.onSliderChanged();
  }
  constructor(public heatingService : HeatingService) {
  }

  public setBurnerStatus(status : boolean){
    this.heatingService.setBurnerStatus(status);
  }

  public setPumpStatus(status : boolean){
    this.heatingService.setPumpStatus(status);
  }

  public onManualMode(status: boolean) {
    this.heatingService.setManualStatus(status);
  }

  public onSliderChanged() {
    console.log('Current debounced value = ' + this.knobValues);
    this.heatingService.setRequestedTemperatureStatus(this.knobValues);
    if (this.knobValues === 0) {
      this.sliderBadgeColor = 'medium';
      this.knobLabel = 'off';
    } else {
      this.sliderBadgeColor = 'danger';
      this.knobLabel = `${this.knobValues}`;
    }
  }
}
