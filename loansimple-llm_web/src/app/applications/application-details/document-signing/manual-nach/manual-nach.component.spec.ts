import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualNachComponent } from './manual-nach.component';

describe('ManualNachComponent', () => {
  let component: ManualNachComponent;
  let fixture: ComponentFixture<ManualNachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualNachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualNachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
