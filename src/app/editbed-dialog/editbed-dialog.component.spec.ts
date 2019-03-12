import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbedDialogComponent } from './editbed-dialog.component';

describe('EditbedDialogComponent', () => {
  let component: EditbedDialogComponent;
  let fixture: ComponentFixture<EditbedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
