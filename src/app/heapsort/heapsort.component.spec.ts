import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeapsortComponent } from './heapsort.component';

describe('HeapsortComponent', () => {
  let component: HeapsortComponent;
  let fixture: ComponentFixture<HeapsortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeapsortComponent]
    });
    fixture = TestBed.createComponent(HeapsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
