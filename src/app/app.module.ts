import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { EditMoneyComponent } from './edit-money/edit-money.component';
import {MatDialogModule} from '@angular/material/dialog';
import { StartConfigurationComponent } from './start-configuration/start-configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    EditMoneyComponent,
    StartConfigurationComponent
  ],
    imports: [
        MatDialogModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
