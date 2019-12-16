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

    public loadingSubject: Subject<Boolean> = new Subject();
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
        this.loadingSubject.next(true);
        this.apiService.getPumpStatus().subscribe(value => this.$pumpStatus.next(value));
        this.apiService.getBurnerStatus().subscribe(value => this.$burnerStatus.next(value));
        this.apiService.getTemperatureStatus().subscribe(value => this.$temperature.next(value));
        this.apiService.getHumidityStatus().subscribe(value => this.$humidity.next(value));
        this.apiService.getManualModeStatus().subscribe(value => this.$manualMode.next(value));
        this.apiService.getRequestedTempStatus().subscribe(value => this.$requestedTemperature.next(value));
        this.loadingSubject.next(false);
    }

    public setBurnerStatus(value: boolean) {
        this.loadingSubject.next(true);
        this.apiService.setBurnerMode(value)
            .subscribe(() => {
                    this.apiService.getBurnerStatus().subscribe(value => this.$burnerStatus.next(value));
                    this.loadingSubject.next(false);
                }
            );
    }

    public setPumpStatus(value: boolean) {
        this.loadingSubject.next(true);
        this.apiService.setPumpMode(value)
            .subscribe(() => {
                    this.apiService.getPumpStatus().subscribe(value => this.$pumpStatus.next(value))
                    this.loadingSubject.next(false);
                }
            );
    }

    public setManualStatus(value: boolean) {
        this.loadingSubject.next(true);
        this.apiService.setManualMode(value)
            .subscribe(() => {
                    this.apiService.getManualModeStatus().subscribe(value => this.$manualMode.next(value))
                    this.loadingSubject.next(false);
                }
            );
    }

    public setRequestedTemperatureStatus(value: number) {
        this.loadingSubject.next(true);
        this.apiService.setRequestedTemperature(value)
            .subscribe(() => {
                    this.apiService.getRequestedTempStatus().subscribe(value => this.$requestedTemperature.next(value))
                    this.loadingSubject.next(false);
                }
            );
    }
}
