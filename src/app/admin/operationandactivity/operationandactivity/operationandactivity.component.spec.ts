import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationandactivityComponent } from './operationandactivity.component';

describe('OperationandactivityComponent', () => {
  let component: OperationandactivityComponent;
  let fixture: ComponentFixture<OperationandactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationandactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationandactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
