import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MissionsComponent } from './missions.component';
import { AppService } from '../../app.service';

import { of } from 'rxjs';

describe('MissionsComponent', () => {
  let component: MissionsComponent;
  let fixture: ComponentFixture<MissionsComponent>;
  let service: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [MissionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AppService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get spacex mission data', async () => {
    const arr = [
      {
        links: {
          mission_patch_small: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png'
        },
        mission_name: 'FalconSat',
        flight_number: 1,
        mission_id: ['RAAABR'],
        launch_year: '2019',
        launch_success: true,
      },
      {
        links: {
          mission_patch_small: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png'
        },
        mission_name: 'FalconSat',
        flight_number: 1,
        mission_id: ['RAAABR'],
        launch_year: '2019',
        launch_success: true,
      }
    ];
    spyOn(service, 'fetchData').and.returnValue(of(arr));
    component.getSpacexMissions({});
    expect(component.spaceXDataList.length).toBe(2);
  });
});
