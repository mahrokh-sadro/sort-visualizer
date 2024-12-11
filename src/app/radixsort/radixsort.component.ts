import { Component } from '@angular/core';

@Component({
  selector: 'app-radixsort',
  templateUrl: './radixsort.component.html',
  styleUrls: ['./radixsort.component.css']
})
export class RadixsortComponent {
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
    this.radixSort();
  }

  // Radix Sort Algorithm
  async radixSort() {
    let maxValue = Math.max(...this.array);
    let digitPlace = 1;

    // Process digits starting from least significant
    while (maxValue / digitPlace > 0) {
      await this.countingSortByDigit(digitPlace);
      digitPlace *= 10;
    }

    this.sortedValues = [...this.array];
    this.isSorting = false;
  }

  // Counting Sort by a specific digit (unit, tens, hundreds, etc.)
  async countingSortByDigit(digitPlace: number) {
    const len = this.array.length;
    let output = new Array(len);
    let count = new Array(10).fill(0);

    // Store count of occurrences in count[]
    for (let i = 0; i < len; i++) {
      let digit = Math.floor(this.array[i] / digitPlace) % 10;
      count[digit]++;
    }

    // Change count[i] so that count[i] now contains actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = len - 1; i >= 0; i--) {
      let digit = Math.floor(this.array[i] / digitPlace) % 10;
      output[count[digit] - 1] = this.array[i];
      count[digit]--;
    }

    // Copy the output array to the original array, so that array now contains sorted numbers
    for (let i = 0; i < len; i++) {
      this.array[i] = output[i];
    }

    // Highlight the digits being sorted during this pass
    this.isComparingIndex = [digitPlace]; // Mark the current digit being processed
    await this.sleep(1000);
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
