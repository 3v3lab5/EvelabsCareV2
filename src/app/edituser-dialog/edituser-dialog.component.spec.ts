import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserDialogComponent } from './edituser-dialog.component';

describe('EdituserDialogComponent', () => {
  let component: EdituserDialogComponent;
  let fixture: ComponentFixture<EdituserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdituserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
