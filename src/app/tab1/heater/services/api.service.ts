import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map, retry, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    // API path
    private base_path = 'http://192.168.1.30:8080/api/fecontrol/';
    // private base_path = 'http://localhost:8080/api/fecontrol/';
    private pumpEndpoint = 'pump';
    private burnerEndpoint = 'burner';
    private tempEndpoint = 'temp';
    private humidityEndpoint = 'humidity';
    private manualModeEndpoint = 'manual';
    private requestedTemperatureEndpoint = 'requestedtemp';
    // private killSwitchEndpoint = 'temp';

    constructor(private http: HttpClient) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    }

    getPumpStatus(): Observable<boolean> {
        return this.getBoolean(this.pumpEndpoint);
    }

    getBurnerStatus(): Observable<boolean> {
        return this.getBoolean(this.burnerEndpoint);
    }

    getManualModeStatus(): Observable<boolean> {
        return this.getBoolean(this.manualModeEndpoint);
    }

    getTemperatureStatus(): Observable<number> {
        return this.getNumber(this.tempEndpoint);
    }

    getHumidityStatus(): Observable<number> {
        return this.getNumber(this.humidityEndpoint);
    }

    getRequestedTempStatus(): Observable<number> {
        return this.getNumber(this.requestedTemperatureEndpoint);
    }

    setPumpMode(value: boolean): Observable<Object> {
        return this.setBoolean(this.pumpEndpoint, value);
    }

    setBurnerMode(value: boolean): Observable<Object> {
        return this.setBoolean(this.burnerEndpoint, value);
    }

    setManualMode(value: boolean): Observable<Object> {
        return this.setBoolean(this.manualModeEndpoint, value);
    }

    setRequestedTemperature(value: number): Observable<Object> {
        return this.setNumber(this.requestedTemperatureEndpoint, value);
    }

    private getBoolean(subPath: string): Observable<boolean> {
        return this.http
            .get<boolean>(this.base_path + subPath)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    private getNumber(subPath: string): Observable<number> {
        return this.http
            .get<number>(this.base_path + subPath)
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
    }

    private setBoolean(subPath: string, value: boolean): Observable<Object> {
        return this.http
            .put(this.base_path + subPath + "?setting=" + value, '')
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    private setNumber(subPath: string, value: number): Observable<Object> {
        return this.http
            .put(this.base_path + subPath + "?value=" + value, '')
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}
