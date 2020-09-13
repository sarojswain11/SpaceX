import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FilterTypes } from './constants/filter.model';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {}

  fetchData(params: FilterTypes): Observable<any> {
    let spacexApi = 'https://api.spaceXdata.com/v3/launches?limit=100';

    if (Object.keys(params).length > 0) {
      Object.keys(params).forEach((param) => {
        spacexApi += `&${param}=${params[param]}`;
      });
    }
    // console.log(spacexApi);
    return this.http.get(spacexApi);
  }
}
