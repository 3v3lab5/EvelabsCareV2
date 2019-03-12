import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletestationDialogComponent } from './deletestation-dialog.component';

describe('DeletestationDialogComponent', () => {
  let component: DeletestationDialogComponent;
  let fixture: ComponentFixture<DeletestationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletestationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletestationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
