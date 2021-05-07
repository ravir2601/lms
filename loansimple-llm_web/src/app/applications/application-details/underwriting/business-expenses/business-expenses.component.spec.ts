import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessExpensesComponent } from './business-expenses.component';

describe('BusinessExpensesComponent', () => {
  let component: BusinessExpensesComponent;
  let fixture: ComponentFixture<BusinessExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
