import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { InputComponent } from './home/input.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  entryComponents: [InputComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    InputComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TreeModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgbModule.forRoot(),
    HttpModule,
    RouterModule.forRoot([
      {path: '' , component: HomeComponent}])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
