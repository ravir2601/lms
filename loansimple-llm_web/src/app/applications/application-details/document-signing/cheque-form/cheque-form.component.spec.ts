import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeFormComponent } from './cheque-form.component';

xdescribe('ChequeFormComponent', () => {
  let component: ChequeFormComponent;
  let fixture: ComponentFixture<ChequeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
