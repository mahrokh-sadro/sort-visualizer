import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleSortComponent } from './bubble-sort.component';

describe('BubbleSortComponent', () => {
  let component: BubbleSortComponent;
  let fixture: ComponentFixture<BubbleSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BubbleSortComponent]
    });
    fixture = TestBed.createComponent(BubbleSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
