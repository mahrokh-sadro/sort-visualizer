import { Component, NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  currentSort: string = 'bubble';
  arraySize: number = 50;
  sortType="Bubble Sort";
  array: number[] = [];
  sortedValues: number[] = [];
  isComparingIndex: number[] = [];
  isSorting: boolean = false;
  sliderValue: number = 50;

  constructor() {
    this.generateArray();
  }

  showComponent(sortType: string): void {
    console.log(sortType)
    this.currentSort = sortType;
  }

  generateNewArray(): void {
    this.generateArray();
  }

  onArraySizeChange(): void {
    
  }

  sortArray(sortType: string): void {
    if( sortType=="bubble"){
      this.isSorting = true;
      this.bubbleSort();
    }
    else if( sortType=="heap"){
      this.isSorting = true;
      this.sortType="Heap Sort";
      this.heapSort(this.array).then(() => {
        this.isSorting = false;
      });
    }
    else if( sortType=="insert"){
      this.isSorting = true;
      this.sortType="Insertion Sort";
      this.insertionSort();
    }
    else if( sortType=="bucket"){
      this.isSorting = true;
      this.sortType="Bucket Sort";
      this.bucketSort(this.array).then(() => {
        this.isSorting = false;
      });
    }
    else if(sortType=="quick"){
      this.isSorting = true;
      this.sortType="Quick Sort";
     this.quickSort(0, this.array.length - 1);
    }
  }

  async bubbleSort() {
    const len = this.array.length;
    let isSorted = false;

    while (!isSorted) {
      isSorted = true;

      for (let i = 0; i < len - 1; i++) {
        this.isComparingIndex = [i, i + 1];

        await this.sleep(this.sliderValue);

        if (this.array[i] > this.array[i + 1]) {
          [this.array[i], this.array[i + 1]] = [this.array[i + 1], this.array[i]];
          isSorted = false;
        }

        this.isComparingIndex = []; 
      }
    }

    this.sortedValues = [...this.array];
    this.isSorting = false;
  }

  isComparing(index: number): boolean {
    return this.isComparingIndex.includes(index);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 /////////////////////////////////////////////////////////// heapsort
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

  async heapSort(arr: number[]): Promise<void> {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      this.swap(arr, 0, i);
      this.isComparingIndex = [0, i];
      await this.sleep(10);
      await this.heapify(arr, i, 0);
    }
    this.sortedValues = [...arr];
  }

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
      await this.sleep(100);
      await this.heapify(arr, n, largest);
    }
  }

  swap(arr: number[], i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

///////////////////////////////////////////////////////////insert sort
async insertionSort() {
  const len = this.array.length;

  for (let i = 1; i < len; i++) {
    let key = this.array[i];
    let j = i - 1;

    this.isComparingIndex = [i];
    await this.sleep(this.sliderValue);

    while (j >= 0 && this.array[j] > key) {
      this.isComparingIndex = [j, j + 1]; 
      await this.sleep(this.sliderValue);

      this.array[j + 1] = this.array[j];
      j = j - 1;

      this.isComparingIndex = []; 
      await this.sleep(this.sliderValue);
    }

    this.array[j + 1] = key; 
  }

  this.sortedValues = [...this.array];
  this.isSorting = false;
}
////////////////////////////////////////////////////////////bucketsort
  async bucketSort(arr: number[]): Promise<void> {
    const maxValue = Math.max(...arr);
    const bucketCount = Math.floor(maxValue / 10) + 1;
    const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

    for (let i = 0; i < arr.length; i++) {
      const index = Math.floor(arr[i] / 10);
      buckets[index].push(arr[i]);
    }

    for (let i = 0; i < buckets.length; i++) {
      await this.insertionSort_(buckets[i], i);
    }
    const sortedArray: number[] = buckets.flat();

    for (let i = 0; i < sortedArray.length; i++) {
      arr[i] = sortedArray[i];
      await this.sleep(this.sliderValue);
    }

    this.sortedValues = [...arr];
  }

  async insertionSort_(bucket: number[], bucketIndex: number): Promise<void> {
    for (let i = 1; i < bucket.length; i++) {
      let j = i;
      while (j > 0 && bucket[j] < bucket[j - 1]) {
        this.isComparingIndex = [j, j - 1];
        this.swap(bucket, j, j - 1);
        await this.sleep(this.sliderValue);
        j--;
      }
    }
    await this.sleep(this.sliderValue);
  }

  ///////////////////////////////////////////////////////////////// quick
  async quickSort(low: number, high: number) {
    if (low < high) {
      const pivotIndex = await this.partition(low, high);
      await this.quickSort(low, pivotIndex - 1);
      await this.quickSort(pivotIndex + 1, high);
    } else {
      this.isSorting = false;
      this.sortedValues = [...this.array];
    }
  }

  async partition(low: number, high: number): Promise<number> {
    const pivot = this.array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      this.isComparingIndex = [i, j]; 
      await this.sleep(this.sliderValue);

      if (this.array[j] < pivot) {
        i++;
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        this.isComparingIndex = []; 
        await this.sleep(this.sliderValue);
      }
    }
    [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
    return i + 1;
  }


}
