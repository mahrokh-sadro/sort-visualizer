import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionsortComponent } from './selectionsort.component';

describe('SelectionsortComponent', () => {
  let component: SelectionsortComponent;
  let fixture: ComponentFixture<SelectionsortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionsortComponent]
    });
    fixture = TestBed.createComponent(SelectionsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
