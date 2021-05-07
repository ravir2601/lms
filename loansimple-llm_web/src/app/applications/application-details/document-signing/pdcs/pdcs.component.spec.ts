import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdcsComponent } from './pdcs.component';

describe('PdcsComponent', () => {
  let component: PdcsComponent;
  let fixture: ComponentFixture<PdcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
