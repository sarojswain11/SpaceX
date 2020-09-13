import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FilterTypes } from '../../constants/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  activeYear: string = '';
  launchFilter: string = '';
  landingFilter: string = '';

  years: string[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
  ];
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.launch_year) { this.activeYear = params.launch_year; }
      if (params.launch_success) { this.launchFilter = params.launch_success; }
      if (params.landing_success) { this.landingFilter = params.landing_success; }
    });
  }

  onClickYearFilter(year: string): void {
    if (year === this.activeYear) {
      this.activeYear = '';
      this.navigate(this.genericQueryParams());
      return;
    }
    this.activeYear = year;
    this.navigate(this.genericQueryParams());
  }

  onClickLaunchFilter(flag: string): void {
    if (flag === this.launchFilter) {
      this.launchFilter = '';
      this.navigate(this.genericQueryParams());
      return;
    }
    this.launchFilter = flag;
    this.navigate(this.genericQueryParams());
  }

  onClickLandingFilter(flag: string): void {
    if (flag === this.landingFilter) {
      this.landingFilter = '';
      this.navigate(this.genericQueryParams());
      return;
    }
    this.landingFilter = flag;
    this.navigate(this.genericQueryParams());
  }

  genericQueryParams(): FilterTypes {
    let queryParams: FilterTypes = {};
    const arr = ['launch_year', 'launch_success', 'landing_success'];
    arr.forEach((type) => {
      if (type === 'launch_year') {
        if (this.activeYear) {
          queryParams['launch_year'] = this.activeYear;
        }
      }
      if (type === 'launch_success') {
        if (this.launchFilter) {
          queryParams['launch_success'] = this.launchFilter;
        }
      }
      if (type === 'landing_success') {
        if (this.landingFilter) {
          queryParams['landing_success'] = this.landingFilter;
        }
      }
    });
    return queryParams;
  }

  navigate(params: FilterTypes): void {
    this.router.navigate(['/filter'], { queryParams: params });
  }
}
