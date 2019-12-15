import {Component, OnInit} from '@angular/core';
import {HeatingService} from "./heater/services/heating.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  ngOnInit(): void {
    this.heatingService.refreshData();
  }
  constructor(public heatingService : HeatingService) {
  }

  public setBurnerStatus(status : boolean){
    this.heatingService.setBurnerStatus(status);
  }

  public setPumpStatus(status : boolean){
    this.heatingService.setPumpStatus(status);
  }

  public setManualModeStatus(status : boolean){
    this.heatingService.setManualStatus(status);
  }
}
