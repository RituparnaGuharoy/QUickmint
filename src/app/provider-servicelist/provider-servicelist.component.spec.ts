import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderServicelistComponent } from './provider-servicelist.component';

describe('ProviderServicelistComponent', () => {
  let component: ProviderServicelistComponent;
  let fixture: ComponentFixture<ProviderServicelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderServicelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderServicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
