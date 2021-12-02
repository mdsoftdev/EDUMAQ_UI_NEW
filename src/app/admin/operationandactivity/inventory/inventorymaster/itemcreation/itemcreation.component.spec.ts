import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemcreationComponent } from './itemcreation.component';

describe('ItemcreationComponent', () => {
  let component: ItemcreationComponent;
  let fixture: ComponentFixture<ItemcreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemcreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
