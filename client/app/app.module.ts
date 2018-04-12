import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {BotComponent} from './components/bot/bot.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule],
  declarations: [AppComponent, BotComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
