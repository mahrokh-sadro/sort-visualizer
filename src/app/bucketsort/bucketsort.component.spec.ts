import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketsortComponent } from './bucketsort.component';

describe('BucketsortComponent', () => {
  let component: BucketsortComponent;
  let fixture: ComponentFixture<BucketsortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BucketsortComponent]
    });
    fixture = TestBed.createComponent(BucketsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
