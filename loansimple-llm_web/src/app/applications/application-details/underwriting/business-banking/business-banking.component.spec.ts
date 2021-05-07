import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessBankingComponent } from './business-banking.component';

describe('BusinessBankingComponent', () => {
  let component: BusinessBankingComponent;
  let fixture: ComponentFixture<BusinessBankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessBankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
