import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LocalStorageComponent } from './components/local-storage/local-storage.component';
import { RepositoriesListComponent } from './components/repositories-list/repositories-list.component';
import { FormComponent } from './components/form/form.component';
import { AlertModule } from './alert';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RepositoryComponent,
    HomeComponent,
    NavbarComponent,
    LocalStorageComponent,
    RepositoriesListComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormlyBootstrapModule,
    AlertModule,
    FormlyModule.forRoot()
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
