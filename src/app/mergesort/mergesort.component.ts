import { Component } from '@angular/core';

@Component({
  selector: 'app-mergesort',
  templateUrl: './mergesort.component.html',
  styleUrls: ['./mergesort.component.css']
})
export class MergesortComponent {
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
    this.mergeSort(this.array).then(() => {
      this.isSorting = false;
    });
  }

  // Merge Sort Algorithm
  async mergeSort(arr: number[]): Promise<void> {
    if (arr.length <= 1) return;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Recursively split and sort the array
    await this.mergeSort(left);
    await this.mergeSort(right);

    // Merge the sorted halves
    await this.merge(arr, left, right);
  }

  // Merge two sorted arrays
  async merge(arr: number[], left: number[], right: number[]): Promise<void> {
    let i = 0;
    let j = 0;
    let k = 0;

    while (i < left.length && j < right.length) {
      this.isComparingIndex = [i, j];

      if (left[i] < right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      k++;

      // Visualize the array during the merge step
      await this.sleep(200);
    }

    // Copy any remaining elements from left or right
    while (i < left.length) {
      this.isComparingIndex = [i];
      arr[k] = left[i];
      i++;
      k++;
      await this.sleep(300);
    }

    while (j < right.length) {
      this.isComparingIndex = [j];
      arr[k] = right[j];
      j++;
      k++;
      await this.sleep(300);
    }

    // Update the visualization after sorting this part of the array
    this.sortedValues = [...arr];
  }

  // Check if the element at the given index is being compared
  isComparing(index: number): boolean {
    return this.isComparingIndex.includes(index);
  }

  // Sleep function to introduce a delay so that the sorting process is visualized
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
