import { Component, NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentSort: string = 'bubble';  // Holds the current sorting algorithm to be shown

  showComponent(sortType: string): void {
    console.log(sortType)
    this.currentSort = sortType;
  }

  sortTypes=[
    {
      type: "bubble",
    },
    {
      type: "bucket",
    },
    {
      type: "heap",
    },
    {
      type: "insert",
    },
    {
      type: "merge",
    },
    {
      type: "quick",
    },
    {
      type: "radix",
    },
    {
      type: "select",
    }
  ]
}
