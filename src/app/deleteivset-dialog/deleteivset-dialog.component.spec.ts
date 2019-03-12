import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteivsetDialogComponent } from './deleteivset-dialog.component';

describe('DeleteivsetDialogComponent', () => {
  let component: DeleteivsetDialogComponent;
  let fixture: ComponentFixture<DeleteivsetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteivsetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteivsetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
