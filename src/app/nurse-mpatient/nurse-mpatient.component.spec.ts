import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseMpatientComponent } from './nurse-mpatient.component';

describe('NurseMpatientComponent', () => {
  let component: NurseMpatientComponent;
  let fixture: ComponentFixture<NurseMpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseMpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseMpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
