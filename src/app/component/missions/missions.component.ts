import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '../../app.service';
import { SpaceXData } from '../../constants/spacex.model';
import { FilterTypes } from '../../constants/filter.model';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit {
  spaceXDataList: SpaceXData[] = [];
  isloading: boolean = false;
  noSpacexDataFlag: boolean;

  constructor(private appService: AppService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getSpacexMissions(params);
    });
  }

  getSpacexMissions(filterData: FilterTypes): void {
    this.isloading = true;
    this.appService
      .fetchData(filterData)
      .pipe(
        map((res) => {
          if (!res.length) {
            return;
          }

          const arr = [];

          res.forEach((data) => {
            const {
              mission_name,
              flight_number,
              mission_id,
              launch_year,
              launch_success,
            } = data;
            const missionPatch = data.links
              ? data.links.mission_patch_small
              : '';

            const sdata = {
              missionPatch,
              missionName: mission_name,
              flightNumber: flight_number,
              missionId: mission_id,
              launchYear: launch_year,
              launchSuccess: launch_success,
            };

            arr.push(sdata);
          });
          return arr;
        })
      )
      .subscribe(
        (data) => {
          this.spaceXDataList = data;
          !data ? this.noSpacexDataFlag = true : this.noSpacexDataFlag = false;
          this.isloading = false;
          console.log(this.spaceXDataList);
        },
        (err) => {
          console.log(`Error occured during fetching spacex data: ${err}`);
        }
      );
  }
}
