import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FilterComponent } from './filter.component';
import { FilterTypes } from '../../constants/filter.model';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FilterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on click year filter', () => {
    spyOn(component, 'navigate').and.callThrough();
    spyOn(component, 'genericQueryParams').and.callThrough();
    component.onClickYearFilter('2017');
    expect(component.activeYear).toBe('2017');
    expect(component.genericQueryParams).toHaveBeenCalled();
    expect(component.navigate).toHaveBeenCalled();
  });

  it('on click launch filter', () => {
    spyOn(component, 'navigate').and.callThrough();
    spyOn(component, 'genericQueryParams').and.callThrough();
    component.onClickLaunchFilter('true');
    expect(component.launchFilter).toBe('true');
    expect(component.genericQueryParams).toHaveBeenCalled();
    expect(component.navigate).toHaveBeenCalled();
  });

  it('on click landing filter', () => {
    spyOn(component, 'navigate').and.callThrough();
    spyOn(component, 'genericQueryParams').and.callThrough();
    component.onClickLandingFilter('false');
    expect(component.landingFilter).toBe('false');
    expect(component.genericQueryParams).toHaveBeenCalled();
    expect(component.navigate).toHaveBeenCalled();
  });

  describe('FilterComponent - second suite', () => {
    beforeEach(() => {
      component.activeYear = '2019';
      component.landingFilter = 'true';
      component.landingFilter = 'false';

      it('get generic Query Params', () => {
        const res = component.genericQueryParams();
        expect(res).toBe({
          launch_year: '2019',
          launch_success: 'true',
          landing_success: 'false',
        });
      });
    });
  });
});
