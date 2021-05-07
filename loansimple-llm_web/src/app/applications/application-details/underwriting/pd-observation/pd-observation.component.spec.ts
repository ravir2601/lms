import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdObservationComponent } from './pd-observation.component';

describe('PdObservationComponent', () => {
  let component: PdObservationComponent;
  let fixture: ComponentFixture<PdObservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdObservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
