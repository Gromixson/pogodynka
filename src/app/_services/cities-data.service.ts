import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DarkSkyapi } from 'dark-sky-api';
import { Observable, Subject } from 'rxjs';
import { City } from '../_models/city';


@Injectable({
  providedIn: 'root'
})
export class CitiesDataService {

  readonly API_URL = 'https://api.darksky.net/forecast/62dbb44db61c8d451b39f6bbb6a82795/';
  readonly proxy = 'https://cors-anywhere.herokuapp.com/';
  private citiesList = new Subject();
  public city: City;

  constructor(
    public http: HttpClient
  ) { }

  getWeather(latitude, longitude) {
    return this.http.get(this.proxy + this.API_URL + latitude + ',' + longitude + '?lang=pl&units=si');
  }
  addToList(latitude, longitude) {
    this.city = new City();
    this.city.latitude = latitude;
    this.city.longitude = longitude;
    this.citiesList.next(this.city);
    // console.log('dodaje w serwisie' + latitude + longitude);
    // console.log(this.city);
    // console.log(this.citiesList);
  }
  getList(): Observable<any> {
    return this.citiesList.asObservable();
  }
}
