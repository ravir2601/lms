import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentTransactionsComponent } from './repayment-transactions.component';

describe('RepaymentTransactionsComponent', () => {
  let component: RepaymentTransactionsComponent;
  let fixture: ComponentFixture<RepaymentTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepaymentTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaymentTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
