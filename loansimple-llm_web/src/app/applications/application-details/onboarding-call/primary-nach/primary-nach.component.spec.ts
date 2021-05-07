import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryNachComponent } from './primary-nach.component';

describe('PrimaryNachComponent', () => {
  let component: PrimaryNachComponent;
  let fixture: ComponentFixture<PrimaryNachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryNachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryNachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
