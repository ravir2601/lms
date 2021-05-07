import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsignComponent } from './esign.component';

describe('EsignComponent', () => {
  let component: EsignComponent;
  let fixture: ComponentFixture<EsignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
