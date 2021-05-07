import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnachComponent } from './enach.component';

describe('EnachComponent', () => {
  let component: EnachComponent;
  let fixture: ComponentFixture<EnachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
