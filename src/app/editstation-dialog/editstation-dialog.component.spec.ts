import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstationDialogComponent } from './editstation-dialog.component';

describe('EditstationDialogComponent', () => {
  let component: EditstationDialogComponent;
  let fixture: ComponentFixture<EditstationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditstationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditstationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
