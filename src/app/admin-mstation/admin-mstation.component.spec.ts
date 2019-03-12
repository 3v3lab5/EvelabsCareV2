import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMstationComponent } from './admin-mstation.component';

describe('AdminMstationComponent', () => {
  let component: AdminMstationComponent;
  let fixture: ComponentFixture<AdminMstationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMstationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
