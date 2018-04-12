import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {PaintsComponent} from './components/paints/paints.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule],
  declarations: [AppComponent, PaintsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
