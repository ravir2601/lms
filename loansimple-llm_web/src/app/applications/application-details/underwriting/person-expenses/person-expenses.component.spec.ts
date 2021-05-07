import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonExpensesComponent } from './person-expenses.component';

describe('PersonExpensesComponent', () => {
  let component: PersonExpensesComponent;
  let fixture: ComponentFixture<PersonExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
