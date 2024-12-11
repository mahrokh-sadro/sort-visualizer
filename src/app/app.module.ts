import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';
import { QuicksortComponent } from './quicksort/quicksort.component';
import { InsertionsortComponent } from './insertionsort/insertionsort.component';
import { SelectionsortComponent } from './selectionsort/selectionsort.component';
import { RadixsortComponent } from './radixsort/radixsort.component';
import { MergesortComponent } from './mergesort/mergesort.component';
import { HeapsortComponent } from './heapsort/heapsort.component';
import { BucketsortComponent } from './bucketsort/bucketsort.component';



@NgModule({
  declarations: [
    AppComponent,
    BubbleSortComponent,
    QuicksortComponent,
    InsertionsortComponent,
    SelectionsortComponent,
    RadixsortComponent,
    MergesortComponent,
    HeapsortComponent,
    BucketsortComponent,


  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
