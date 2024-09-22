import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTaskComponent } from './components/all-task/all-task.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import { MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { AddUpdateTaskComponent } from './dialog/add-update-task/add-update-task.component';
import {MatToolbarModule} from '@angular/material/toolbar';

import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';


import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import {MatMenuModule} from '@angular/material/menu';

import { HttpClientModule} from '@angular/common/http';
import { DeleteComponent } from './dialog/delete/delete.component'
import { CustomDateAdapter } from './shared/custom-date-adapter';

import { provideToastr, ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AllTaskComponent,
    AddUpdateTaskComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,

    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: DateAdapter, useClass: CustomDateAdapter },
    provideAnimationsAsync(), // required animations providers
    provideToastr(), // Toastr providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
