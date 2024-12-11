import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionsortComponent } from './insertionsort.component';

describe('InsertionsortComponent', () => {
  let component: InsertionsortComponent;
  let fixture: ComponentFixture<InsertionsortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertionsortComponent]
    });
    fixture = TestBed.createComponent(InsertionsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
