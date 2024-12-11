import { Component } from '@angular/core';

@Component({
  selector: 'app-heapsort',
  templateUrl: './heapsort.component.html',
  styleUrls: ['./heapsort.component.css']
})
export class HeapsortComponent {
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
    this.heapSort(this.array).then(() => {
      this.isSorting = false;
    });
  }

  // Heap Sort Algorithm
  async heapSort(arr: number[]): Promise<void> {
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.heapify(arr, n, i);
    }

    // Extract elements one by one from the heap
    for (let i = n - 1; i > 0; i--) {
      // Move the current root to the end
      this.swap(arr, 0, i);
      this.isComparingIndex = [0, i];
      await this.sleep(500);

      // Heapify the reduced heap
      await this.heapify(arr, i, 0);
    }

    // Set the final sorted array
    this.sortedValues = [...arr];
  }

  // Heapify a subtree rooted at index i
  async heapify(arr: number[], n: number, i: number): Promise<void> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      this.swap(arr, i, largest);
      this.isComparingIndex = [i, largest];
      await this.sleep(500);

      // Recursively heapify the affected subtree
      await this.heapify(arr, n, largest);
    }
  }

  // Swap two elements in the array
  swap(arr: number[], i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  // Check if the element at the given index is being compared
  isComparing(index: number): boolean {
    return this.isComparingIndex.includes(index);
  }

  // Sleep function to introduce a delay for visualization
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
