import { Component } from '@angular/core';

@Component({
  selector: 'app-selectionsort',
  templateUrl: './selectionsort.component.html',
  styleUrls: ['./selectionsort.component.css']
})
export class SelectionsortComponent {
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
    this.selectionSort();
  }

  // Selection Sort Algorithm
  async selectionSort() {
    const len = this.array.length;

    for (let i = 0; i < len - 1; i++) {
      let minIndex = i;
      this.isComparingIndex = [i]; // Mark the current element as comparing
      await this.sleep(50);

      for (let j = i + 1; j < len; j++) {
        this.isComparingIndex = [i, j]; // Compare the current element with the next
        await this.sleep(500);

        if (this.array[j] < this.array[minIndex]) {
          minIndex = j;
        }

        // Once the smallest element is found, swap it with the current element
        if (j === len - 1) {
          [this.array[i], this.array[minIndex]] = [this.array[minIndex], this.array[i]];
          this.isComparingIndex = []; // Reset the comparison state
          await this.sleep(100);
        }
      }
    }

    // Once sorted, store the sorted array
    this.sortedValues = [...this.array];
    this.isSorting = false;
  }

  // Checks if bars are being compared
  isComparing(index: number): boolean {
    return this.isComparingIndex.includes(index);
  }

  // Sleep function to pause for a specific duration
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
