import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditivsetDialogComponent } from './editivset-dialog.component';

describe('EditivsetDialogComponent', () => {
  let component: EditivsetDialogComponent;
  let fixture: ComponentFixture<EditivsetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditivsetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditivsetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
