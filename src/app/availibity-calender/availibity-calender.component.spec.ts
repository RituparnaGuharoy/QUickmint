import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailibityCalenderComponent } from './availibity-calender.component';

describe('AvailibityCalenderComponent', () => {
  let component: AvailibityCalenderComponent;
  let fixture: ComponentFixture<AvailibityCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailibityCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailibityCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
