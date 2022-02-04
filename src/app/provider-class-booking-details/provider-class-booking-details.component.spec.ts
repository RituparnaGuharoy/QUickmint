import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderClassBookingDetailsComponent } from './provider-class-booking-details.component';

describe('ProviderClassBookingDetailsComponent', () => {
  let component: ProviderClassBookingDetailsComponent;
  let fixture: ComponentFixture<ProviderClassBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderClassBookingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderClassBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
