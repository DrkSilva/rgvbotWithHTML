import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {GuysComponent} from './components/guys/guys.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule],
  declarations: [AppComponent, GuysComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
