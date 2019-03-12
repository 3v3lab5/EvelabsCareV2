import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NursePhistoryComponent } from './nurse-phistory.component';

describe('NursePhistoryComponent', () => {
  let component: NursePhistoryComponent;
  let fixture: ComponentFixture<NursePhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NursePhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NursePhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
