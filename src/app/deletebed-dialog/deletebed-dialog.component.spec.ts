import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebedDialogComponent } from './deletebed-dialog.component';

describe('DeletebedDialogComponent', () => {
  let component: DeletebedDialogComponent;
  let fixture: ComponentFixture<DeletebedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletebedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletebedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
