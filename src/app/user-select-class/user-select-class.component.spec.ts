import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectClassComponent } from './user-select-class.component';

describe('UserSelectClassComponent', () => {
  let component: UserSelectClassComponent;
  let fixture: ComponentFixture<UserSelectClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSelectClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
