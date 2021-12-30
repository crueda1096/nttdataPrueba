import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriedetailComponent } from './countriedetail.component';

describe('CountriedetailComponent', () => {
  let component: CountriedetailComponent;
  let fixture: ComponentFixture<CountriedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriedetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
