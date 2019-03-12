import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargepatientDialogComponent } from './dischargepatient-dialog.component';

describe('DischargepatientDialogComponent', () => {
  let component: DischargepatientDialogComponent;
  let fixture: ComponentFixture<DischargepatientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargepatientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargepatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
