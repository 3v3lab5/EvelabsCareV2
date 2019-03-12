import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskactivityDialogComponent } from './taskactivity-dialog.component';

describe('TaskactivityDialogComponent', () => {
  let component: TaskactivityDialogComponent;
  let fixture: ComponentFixture<TaskactivityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskactivityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskactivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
