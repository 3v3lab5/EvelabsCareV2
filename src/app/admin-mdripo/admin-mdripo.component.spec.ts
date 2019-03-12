import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMdripoComponent } from './admin-mdripo.component';

describe('AdminMdripoComponent', () => {
  let component: AdminMdripoComponent;
  let fixture: ComponentFixture<AdminMdripoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMdripoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMdripoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
