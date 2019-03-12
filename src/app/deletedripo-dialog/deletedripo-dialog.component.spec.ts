import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedripoDialogComponent } from './deletedripo-dialog.component';

describe('DeletedripoDialogComponent', () => {
  let component: DeletedripoDialogComponent;
  let fixture: ComponentFixture<DeletedripoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedripoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedripoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
