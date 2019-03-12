import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpatientDialogComponent } from './editpatient-dialog.component';

describe('EditpatientDialogComponent', () => {
  let component: EditpatientDialogComponent;
  let fixture: ComponentFixture<EditpatientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpatientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
