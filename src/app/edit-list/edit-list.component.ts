import { Component, OnInit } from '@angular/core';
import { CitiesDataService } from '../_services/cities-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { log } from 'util';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  setLatitude: number;
  setLongitude: number;
  weatherData;
  badRequest = false;

  constructor(
    private citiesDataService: CitiesDataService
  ) {
  }

  ngOnInit() {
    // this.citiesDataService.getWeather(37.8267, -122.4233);
  }
  check() {
    this.citiesDataService.getWeather(this.setLatitude, this.setLongitude)
      .subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
        this.badRequest = false;
      },
        response => {
          this.badRequest = true;
        });
  }

  addCityToList(latitude, longitude) {
    this.citiesDataService.addToList(latitude, longitude);
    console.log('dodano do listy' + latitude + '/' + longitude);
  }
}
