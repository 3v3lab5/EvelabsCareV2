import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMbedComponent } from './admin-mbed.component';

describe('AdminMbedComponent', () => {
  let component: AdminMbedComponent;
  let fixture: ComponentFixture<AdminMbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
