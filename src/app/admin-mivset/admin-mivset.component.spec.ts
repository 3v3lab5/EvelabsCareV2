import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMivsetComponent } from './admin-mivset.component';

describe('AdminMivsetComponent', () => {
  let component: AdminMivsetComponent;
  let fixture: ComponentFixture<AdminMivsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMivsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMivsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
