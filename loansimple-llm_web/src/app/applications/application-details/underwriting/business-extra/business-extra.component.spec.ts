import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessExtraComponent } from './business-extra.component';

describe('BusinessExtraComponent', () => {
  let component: BusinessExtraComponent;
  let fixture: ComponentFixture<BusinessExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
