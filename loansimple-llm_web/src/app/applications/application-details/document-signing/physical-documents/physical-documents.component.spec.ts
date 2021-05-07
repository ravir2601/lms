import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalDocumentsComponent } from './physical-documents.component';

describe('PhysicalDocumentsComponent', () => {
  let component: PhysicalDocumentsComponent;
  let fixture: ComponentFixture<PhysicalDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
