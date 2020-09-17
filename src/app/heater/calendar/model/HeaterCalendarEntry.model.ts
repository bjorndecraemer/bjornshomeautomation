class HeaterCalendarEntry {

    constructor(timeStamp: string,
                repeatable: boolean,
                repeatableType: HeaterCalendarRepeatableType,
                specificSingleDay: HeaterCalendarSpecificDay,
                specificMultipleDays: HeaterCalendarSpecificDay[],
                isManual: boolean, requestedTemp: number, pumpOn: boolean, burnerOn: boolean) {
        this.timeStamp = timeStamp;
        this.repeatable = repeatable;
        this.repeatableType = repeatableType;
        this.specificSingleDay = specificSingleDay;
        this.specificMultipleDays = specificMultipleDays;
        this.isManual = isManual;
        this.requestedTemp = requestedTemp;
        this.pumpOn = pumpOn;
        this.burnerOn = burnerOn;
    }

    private timeStamp: string;
    private repeatable: boolean;
    private repeatableType: HeaterCalendarRepeatableType;

    private specificSingleDay: HeaterCalendarSpecificDay;
    private specificMultipleDays: HeaterCalendarSpecificDay[];

    private isManual: boolean;

    private requestedTemp: number;
    private pumpOn: boolean;
    private burnerOn: boolean;

}
