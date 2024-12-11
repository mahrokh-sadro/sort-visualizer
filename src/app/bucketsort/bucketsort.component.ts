import { Component } from '@angular/core';

@Component({
  selector: 'app-bucketsort',
  templateUrl: './bucketsort.component.html',
  styleUrls: ['./bucketsort.component.css']
})
export class BucketsortComponent {
  array: number[] = [];
  sortedValues: number[] = [];
  isComparingIndex: number[] = [];
  isSorting: boolean = false;

  constructor() {
    this.generateArray();
    this.startSorting();
  }

  // Generate an array of random numbers for visualization
  generateArray() {
    this.array = [];
    for (let i = 0; i < 20; i++) {
      this.array.push(Math.floor(Math.random() * 100) + 1);
    }
    this.sortedValues = [...this.array];
  }

  // Start the sorting process
  startSorting() {
    this.isSorting = true;
    this.bucketSort(this.array).then(() => {
      this.isSorting = false;
    });
  }

  // Bucket Sort Algorithm
  async bucketSort(arr: number[]): Promise<void> {
    // Find maximum value in the array
    const maxValue = Math.max(...arr);
    const bucketCount = Math.floor(maxValue / 10) + 1;
    
    // Create empty buckets
    const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

    // Distribute the array elements into buckets
    for (let i = 0; i < arr.length; i++) {
      const index = Math.floor(arr[i] / 10);
      buckets[index].push(arr[i]);
    }

    // Sort each bucket using insertion sort (or another sorting algorithm)
    for (let i = 0; i < buckets.length; i++) {
      await this.insertionSort(buckets[i], i);
    }

    // Concatenate the sorted buckets
    const sortedArray: number[] = buckets.flat();

    // Update the original array with the sorted values
    for (let i = 0; i < sortedArray.length; i++) {
      arr[i] = sortedArray[i];
      await this.sleep(100);
    }

    // Update the sorted values for visualization
    this.sortedValues = [...arr];
  }

  // Insertion Sort for sorting each bucket
  async insertionSort(bucket: number[], bucketIndex: number): Promise<void> {
    for (let i = 1; i < bucket.length; i++) {
      let j = i;
      while (j > 0 && bucket[j] < bucket[j - 1]) {
        this.isComparingIndex = [j, j - 1];  // Highlight the comparing elements
        this.swap(bucket, j, j - 1);
        await this.sleep(300);
        j--;
      }
    }
    // Visualize the bucket after sorting
    await this.sleep(500);
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
