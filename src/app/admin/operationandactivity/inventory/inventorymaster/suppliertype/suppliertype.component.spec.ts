import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliertypeComponent } from './suppliertype.component';

describe('SuppliertypeComponent', () => {
  let component: SuppliertypeComponent;
  let fixture: ComponentFixture<SuppliertypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliertypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
