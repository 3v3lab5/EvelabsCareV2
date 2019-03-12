import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpatientDialogComponent } from './addpatient-dialog.component';

describe('AddpatientDialogComponent', () => {
  let component: AddpatientDialogComponent;
  let fixture: ComponentFixture<AddpatientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpatientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
