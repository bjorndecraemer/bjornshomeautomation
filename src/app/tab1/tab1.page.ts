import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeatingService} from "./heater/services/heating.service";
import {interval, Observable} from "rxjs";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{

  knobValues = 0;
  knobLabel = 'Off';
  sliderBadgeColor = 'danger';
  tempTempVar : number;
  $secondsCounterObservable;

  constructor(public heatingService : HeatingService) {
  }

  ngOnInit(): void {
    this.heatingService.refreshData();
    this.heatingService.$requestedTemperature.subscribe(value => {
      this.tempTempVar = value;
      this.refreshSlider();
    });
    this.$secondsCounterObservable = interval(15000).subscribe(() => {this.heatingService.refreshData(); });
  }

  ngOnDestroy(): void {
    this.$secondsCounterObservable.unsubscribe();
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
    this.tempTempVar = this.knobValues;
    this.heatingService.setRequestedTemperatureStatus(this.knobValues);
    this.refreshSlider();
  }

  private refreshSlider(){
    if (this.tempTempVar ===  0) {
      this.sliderBadgeColor = 'medium';
      this.knobLabel = 'off';
    } else {
      this.sliderBadgeColor = 'danger';
      this.knobLabel = `${this.tempTempVar}`;
    }
  }
}
