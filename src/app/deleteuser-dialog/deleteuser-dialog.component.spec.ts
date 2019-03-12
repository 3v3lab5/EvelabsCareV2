import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteuserDialogComponent } from './deleteuser-dialog.component';

describe('DeleteuserDialogComponent', () => {
  let component: DeleteuserDialogComponent;
  let fixture: ComponentFixture<DeleteuserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteuserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteuserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
