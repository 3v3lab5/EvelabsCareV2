import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMuserComponent } from './admin-muser.component';

describe('AdminMuserComponent', () => {
  let component: AdminMuserComponent;
  let fixture: ComponentFixture<AdminMuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
