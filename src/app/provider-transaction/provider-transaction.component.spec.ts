import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderTransactionComponent } from './provider-transaction.component';

describe('ProviderTransactionComponent', () => {
  let component: ProviderTransactionComponent;
  let fixture: ComponentFixture<ProviderTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
