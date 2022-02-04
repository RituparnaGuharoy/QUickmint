import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCalenderComponent } from './service-calender.component';

describe('ServiceCalenderComponent', () => {
  let component: ServiceCalenderComponent;
  let fixture: ComponentFixture<ServiceCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
