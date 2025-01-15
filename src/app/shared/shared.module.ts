import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    CapitalizePipe,
  ],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    CapitalizePipe,
  ],
})
export class SharedModule {}
