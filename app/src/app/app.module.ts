import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgresBarComponent } from './components/progres-bar/progres-bar.component';
import { TestComponent } from './components/test/test/test.component';

@NgModule({
  declarations: [AppComponent, ProgresBarComponent, TestComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
