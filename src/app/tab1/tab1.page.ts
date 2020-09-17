import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeatingService} from '../heater/services/heating.service';
import {BehaviorSubject, interval} from 'rxjs';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  knobValues = 0;
  knobLabel = 'Off';
  sliderBadgeColor = 'danger';
  tempTempVar: number;
  $secondsCounterObservable;
  $tempReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(public heatingService: HeatingService, public toastController: ToastController) {
  }

  ngOnInit(): void {
    this.heatingService.refreshData();
    this.heatingService.$requestedTemperature.subscribe(value => {
      this.tempTempVar = value;
      this.knobValues = value;
      this.$tempReady.next(true);
      this.refreshSlider();
    });
    this.$secondsCounterObservable = interval(15000).subscribe(() => {this.heatingService.refreshData(); });
    this.heatingService.$connectionError.subscribe(value => this.presentToast(value));
  }

  ngOnDestroy(): void {
    this.$secondsCounterObservable.unsubscribe();
    this.$tempReady.next(false);
  }

  async presentToast(value: string) {
      const toast = await this.toastController.create({
        header: 'Error',
        message: 'Connecting to the pi failed, please check your wifi settings',
        position: 'top',
        duration: 7000,
        color: 'danger'
      });
      toast.present();

  }

  public setBurnerStatus(status: boolean) {
    this.heatingService.setBurnerStatus(status);
  }

  public setPumpStatus(status: boolean) {
    this.heatingService.setPumpStatus(status);
  }

  public onManualMode(status: boolean) {
    this.heatingService.setManualStatus(status);
  }

  public onSliderChanged() {
    console.log('Current debounced value = ' + this.knobValues);
    if (!this.tempTempVar || this.tempTempVar !== this.knobValues) {
      console.log('Persisting!');
      this.tempTempVar = this.knobValues;
      this.heatingService.setRequestedTemperatureStatus(this.knobValues);
      this.refreshSlider();
    }
  }

  private refreshSlider() {
    if (this.tempTempVar ===  0) {
      this.sliderBadgeColor = 'medium';
      this.knobLabel = 'off';
    } else {
      this.sliderBadgeColor = 'danger';
      this.knobLabel = `${this.tempTempVar}`;
    }
  }
}
