import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskDialogComponent } from './addtask-dialog.component';

describe('AddtaskDialogComponent', () => {
  let component: AddtaskDialogComponent;
  let fixture: ComponentFixture<AddtaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
