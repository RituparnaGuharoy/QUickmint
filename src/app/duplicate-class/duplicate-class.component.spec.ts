import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateClassComponent } from './duplicate-class.component';

describe('DuplicateClassComponent', () => {
  let component: DuplicateClassComponent;
  let fixture: ComponentFixture<DuplicateClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicateClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
