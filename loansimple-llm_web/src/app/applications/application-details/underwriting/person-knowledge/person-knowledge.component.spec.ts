import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonKnowledgeComponent } from './person-knowledge.component';

describe('PersonKnowledgeComponent', () => {
  let component: PersonKnowledgeComponent;
  let fixture: ComponentFixture<PersonKnowledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonKnowledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
