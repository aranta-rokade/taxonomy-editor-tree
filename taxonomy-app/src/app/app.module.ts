import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    TreeModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:"", component:HomeComponent}])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
