import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateFormComponent } from './state-form.component';

describe('StateFormComponent', () => {
  let component: StateFormComponent;
  let fixture: ComponentFixture<StateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
