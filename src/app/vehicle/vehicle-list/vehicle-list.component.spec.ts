import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListComponent } from './vehicle-list.component';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService } from '../vehicle.service';
import { DebugElement } from '@angular/core';
import { Vehicle } from '../vehicle';
import { faker } from '@faker-js/faker';
import {By} from '@angular/platform-browser';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [VehicleListComponent],
      providers: [VehicleService]
    })
    .compileComponents();


  });

  beforeEach(() =>{
    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;

    for(let i = 0; i < 3; i++){
      const vehicle = new Vehicle(
        faker.number.int(),
        faker.word.words(1),
        faker.word.words(1),
        faker.word.words(1),
        faker.number.int(),
        faker.number.int(),
        faker.word.words(1),
        faker.image.url()
      );
      component.vehicles.push(vehicle);
    }
    fixture.detectChanges();
    debug = fixture.debugElement;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has a table', () => {
    expect(debug.query(By.css('table'))).toBeTruthy();
  });

  it('should has a table with 4 rows', () => {
    expect(debug.queryAll(By.css('tr')).length).toBe(4);
  });

  it('should has a table with 1 thead', () => {
    expect(debug.queryAll(By.css('thead')).length).toBe(1);
  });

  it('should has a table with 1 tbody', () => {
    expect(debug.queryAll(By.css('tbody')).length).toBe(1);
  });
});
