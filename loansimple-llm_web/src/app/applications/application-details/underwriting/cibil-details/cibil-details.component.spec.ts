import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibilDetailsComponent } from './cibil-details.component';

describe('CibilDetailsComponent', () => {
  let component: CibilDetailsComponent;
  let fixture: ComponentFixture<CibilDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibilDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibilDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
