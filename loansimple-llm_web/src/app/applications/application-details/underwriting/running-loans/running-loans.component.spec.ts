import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningLoansComponent } from './running-loans.component';

describe('RunningLoansComponent', () => {
  let component: RunningLoansComponent;
  let fixture: ComponentFixture<RunningLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
