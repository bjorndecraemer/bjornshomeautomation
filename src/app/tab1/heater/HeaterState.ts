export interface HeaterState{
    burnerStatus : boolean,
    pumpStatus : boolean,
    temperature : number,
    humidity : number,
    manualMode : boolean,
    setTemperature : number,
    killSwitch : boolean;
}