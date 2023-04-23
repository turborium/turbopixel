import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, BottomSheetEffects } from './app.component';
import { CameraErrorDialogComponent } from './camera-error-dialog/camera-error-dialog.component'; 
import { SaveDialogComponent } from './save-dialog/save-dialog.component'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { ServiceWorkerModule } from '@angular/service-worker'; 

@NgModule({
  declarations: [
    AppComponent,
    CameraErrorDialogComponent,
    BottomSheetEffects,
    SaveDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // --
    FormsModule, 
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    // --
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
