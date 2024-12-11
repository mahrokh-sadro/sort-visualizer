import { Component } from '@angular/core';

@Component({
  selector: 'app-insertionsort',
  templateUrl: './insertionsort.component.html',
  styleUrls: ['./insertionsort.component.css']
})
export class InsertionsortComponent {
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
    this.insertionSort();
  }

  // Insertion Sort Algorithm
  async insertionSort() {
    const len = this.array.length;

    for (let i = 1; i < len; i++) {
      let key = this.array[i];
      let j = i - 1;

      this.isComparingIndex = [i]; // Mark current element as comparing
      await this.sleep(500);

      // Move elements of the array that are greater than the key
      while (j >= 0 && this.array[j] > key) {
        this.isComparingIndex = [j, j + 1]; // Compare the current element with the previous
        await this.sleep(50);

        // Swap the elements
        this.array[j + 1] = this.array[j];
        j = j - 1;

        this.isComparingIndex = []; // Reset the comparison state
        await this.sleep(500);
      }

      this.array[j + 1] = key; // Insert the key at the correct position
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
