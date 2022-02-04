import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePlannerComponent } from './service-planner.component';

describe('ServicePlannerComponent', () => {
  let component: ServicePlannerComponent;
  let fixture: ComponentFixture<ServicePlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePlannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
