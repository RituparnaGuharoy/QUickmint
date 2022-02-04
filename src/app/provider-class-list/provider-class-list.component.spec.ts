import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderClassListComponent } from './provider-class-list.component';

describe('ProviderClassListComponent', () => {
  let component: ProviderClassListComponent;
  let fixture: ComponentFixture<ProviderClassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderClassListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
