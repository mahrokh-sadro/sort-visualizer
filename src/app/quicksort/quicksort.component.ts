import { Component } from '@angular/core';

@Component({
  selector: 'app-quicksort',
  templateUrl: './quicksort.component.html',
  styleUrls: ['./quicksort.component.css']
})
export class QuicksortComponent {
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
    this.quickSort(0, this.array.length - 1);
  }

  // Quick Sort Algorithm
  async quickSort(low: number, high: number) {
    if (low < high) {
      const pivotIndex = await this.partition(low, high);

      // Recursively sort the sub-arrays
      await this.quickSort(low, pivotIndex - 1);
      await this.quickSort(pivotIndex + 1, high);
    } else {
      this.isSorting = false;
      this.sortedValues = [...this.array];
    }
  }

  // Partitioning logic for Quick Sort
  async partition(low: number, high: number): Promise<number> {
    const pivot = this.array[high];
    let i = low - 1;

    // Visualize comparing the bars
    for (let j = low; j < high; j++) {
      this.isComparingIndex = [i, j]; // Bars being compared
      await this.sleep(500);

      if (this.array[j] < pivot) {
        i++;
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        // Update the heights of the bars
        this.isComparingIndex = []; // Reset comparison state
        await this.sleep(25);
      }
    }

    // Place the pivot in the correct position
    [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
    return i + 1;
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
