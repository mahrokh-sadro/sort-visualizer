import { Component } from '@angular/core';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.css']
})
export class BubbleSortComponent {
  array: number[] = [];
  sortedValues: number[] = [];
  isComparingIndex: number[] = [];
  isSorting: boolean = false;

  constructor() {
    this.generateArray();
    this.startSorting();
  }

  generateArray() {
    this.array = [];
    for (let i = 0; i < 20; i++) {
      this.array.push(Math.floor(Math.random() * 100) + 1);
    }
    this.sortedValues = [...this.array];
  }

  startSorting() {
    this.isSorting = true;
    this.bubbleSort();
  }

  async bubbleSort() {
    const len = this.array.length;
    let isSorted = false;

    while (!isSorted) {
      isSorted = true;

      for (let i = 0; i < len - 1; i++) {
        this.isComparingIndex = [i, i + 1]; // Show bars being compared

        // Pause for animation effect
        await this.sleep(100);

        if (this.array[i] > this.array[i + 1]) {
          [this.array[i], this.array[i + 1]] = [this.array[i + 1], this.array[i]];
          isSorted = false; // If any swaps occur, we're not done sorting
        }

        this.isComparingIndex = []; // Clear the comparison state
      }
    }

    // Once sorted, store the sorted array
    this.sortedValues = [...this.array];
    this.isSorting = false;
  }

  isComparing(index: number): boolean {
    return this.isComparingIndex.includes(index);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
