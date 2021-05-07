import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamStructureComponent } from './cam-structure.component';

describe('CamStructureComponent', () => {
  let component: CamStructureComponent;
  let fixture: ComponentFixture<CamStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
