import { Component, OnInit } from '@angular/core';
import { CitiesDataService } from '../_services/cities-data.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss']
})
export class CitiesListComponent implements OnInit {

  userList = [];

  constructor(
    private citiesDataService: CitiesDataService
  ) { }

  ngOnInit() {
    this.userList = JSON.parse(localStorage.getItem('userCitiesList'));
    this.citiesDataService.getList().subscribe(data => {
      this.citiesDataService.getWeather(data.latitude, data.longitude).subscribe(data => {
        const weather = data;
        this.userList.push(weather);
        console.log(this.userList);
        localStorage.setItem('userCitiesList', JSON.stringify(this.userList));
      });
    });
  }

  removeCity(index) {
    this.userList.splice(index, 1);
  }


}
