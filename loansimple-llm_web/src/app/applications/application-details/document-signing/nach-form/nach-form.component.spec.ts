import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachFormComponent } from './nach-form.component';

describe('NachFormComponent', () => {
  let component: NachFormComponent;
  let fixture: ComponentFixture<NachFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
