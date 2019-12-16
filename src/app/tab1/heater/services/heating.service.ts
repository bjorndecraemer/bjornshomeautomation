import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {ApiService} from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class HeatingService implements OnInit {

    ngOnInit(): void {
        this.refreshData();
    }

    $burnerStatus: BehaviorSubject<boolean> = new BehaviorSubject(null);
    $pumpStatus: BehaviorSubject<boolean> = new BehaviorSubject(null);
    $temperature: BehaviorSubject<number> = new BehaviorSubject(null);
    $humidity: BehaviorSubject<number> = new BehaviorSubject(null);
    $manualMode: BehaviorSubject<boolean> = new BehaviorSubject(null);
    $requestedTemperature: BehaviorSubject<number> = new BehaviorSubject(null);
    $killSwitch: BehaviorSubject<boolean> = new BehaviorSubject(null);

    private logs: string = "";

    constructor(private apiService: ApiService) {
    }

    public refreshData() {
        this.apiService.getPumpStatus().subscribe(value => this.$pumpStatus.next(value));
        this.apiService.getBurnerStatus().subscribe(value => this.$burnerStatus.next(value));
        this.apiService.getTemperatureStatus().subscribe(value => this.$temperature.next(value));
        this.apiService.getHumidityStatus().subscribe(value => this.$humidity.next(value));
        this.apiService.getManualModeStatus().subscribe(value => this.$manualMode.next(value));
        this.apiService.getRequestedTempStatus().subscribe(value => this.$requestedTemperature.next(value));
    }

    public setBurnerStatus(value: boolean) {
        this.apiService.setBurnerMode(value)
            .subscribe(() =>
                this.apiService.getBurnerStatus().subscribe(value => this.$burnerStatus.next(value))
            );
    }

    public setPumpStatus(value: boolean) {
        this.apiService.setPumpMode(value)
            .subscribe(() =>
                this.apiService.getPumpStatus().subscribe(value => this.$pumpStatus.next(value))
            );
    }

    public setManualStatus(value: boolean) {
        this.apiService.setManualMode(value)
            .subscribe(() =>
                this.apiService.getManualModeStatus().subscribe(value => this.$manualMode.next(value))
            );
    }

    public setRequestedTemperatureStatus(value: number) {
        this.apiService.setRequestedTemperature(value)
            .subscribe(() =>
                this.apiService.getRequestedTempStatus().subscribe(value => this.$requestedTemperature.next(value))
            );
    }
}
