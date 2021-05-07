import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallRecordingComponent } from './call-recording.component';

describe('CallRecordingComponent', () => {
  let component: CallRecordingComponent;
  let fixture: ComponentFixture<CallRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
