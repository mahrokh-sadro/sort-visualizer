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

  arraySize: number = 50;

  generateNewArray(): void {
    this.generateArray();
  }

  onArraySizeChange(): void {
    console.log(`Array size changed to: ${this.arraySize}`);
    // Logic to handle array size changes
  }

  sortArray(sortType: string): void {
    if( sortType=="bubble"){
      this.isSorting = true;
      this.bubbleSort();
    }
    if( sortType=="heap"){
      this.isSorting = true;
      this.sortType="Heap Sort";
      this.heapSort(this.array).then(() => {
        this.isSorting = false;
      });
    }
  }
  sortType="Bubble Sort";
  array: number[] = [];
  sortedValues: number[] = [];
  isComparingIndex: number[] = [];
  isSorting: boolean = false;

  constructor() {
    this.generateArray();
    this.startSorting();
  }

  // generateArray() {
  //   this.array = [];
  //   for (let i = 0; i < 50; i++) {
  //     this.array.push(Math.floor(Math.random() * 100) + 1);
  //   }
  //   this.sortedValues = [...this.array];
  // }
  
  // startSorting() {
  //   this.isSorting = true;
  //   this.bubbleSort();
  // }

  async bubbleSort() {
    const len = this.array.length;
    let isSorted = false;

    while (!isSorted) {
      isSorted = true;

      for (let i = 0; i < len - 1; i++) {
        this.isComparingIndex = [i, i + 1]; // Show bars being compared

        // Pause for animation effect
        await this.sleep(20);

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


  /////////////////////////////////////////////////////////
  //heapsort
  generateArray() {
    this.array = [];
    for (let i = 0; i < this.arraySize; i++) {
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
  // isComparing(index: number): boolean {
  //   return this.isComparingIndex.includes(index);
  // }

  // // Sleep function to introduce a delay for visualization
  // sleep(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }









}
