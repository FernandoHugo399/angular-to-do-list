import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page404/page404.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import {LoadingComponent} from "./components/loading/loading.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    Page404Component,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    provideAnimations(),
    provideToastr()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
