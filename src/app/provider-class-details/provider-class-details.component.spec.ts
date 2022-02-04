import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderClassDetailsComponent } from './provider-class-details.component';

describe('ProviderClassDetailsComponent', () => {
  let component: ProviderClassDetailsComponent;
  let fixture: ComponentFixture<ProviderClassDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderClassDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
