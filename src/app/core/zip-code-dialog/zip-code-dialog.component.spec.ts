import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipCodeDialogComponent } from './zip-code-dialog.component';

describe('ZipCodeDialogComponent', () => {
  let component: ZipCodeDialogComponent;
  let fixture: ComponentFixture<ZipCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZipCodeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZipCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
