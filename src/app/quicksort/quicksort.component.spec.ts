import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicksortComponent } from './quicksort.component';

describe('QuicksortComponent', () => {
  let component: QuicksortComponent;
  let fixture: ComponentFixture<QuicksortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuicksortComponent]
    });
    fixture = TestBed.createComponent(QuicksortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
