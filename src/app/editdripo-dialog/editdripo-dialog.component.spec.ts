import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdripoDialogComponent } from './editdripo-dialog.component';

describe('EditdripoDialogComponent', () => {
  let component: EditdripoDialogComponent;
  let fixture: ComponentFixture<EditdripoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdripoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdripoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
