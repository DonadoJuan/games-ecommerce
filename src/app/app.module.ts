import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatSelectModule } from '@angular/material/select';
import { OwlModule } from 'ngx-owl-carousel';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UtilsService } from './core/utils.service';
import { WrapperLoginComponent } from './pages/wrapper-login/wrapper-login.component';
import { LoginComponent } from './pages/wrapper-login/login/login.component';
import { SignupComponent } from './pages/wrapper-login/signup/signup.component';
import { SlideshowComponent } from './pages/home/slideshow/slideshow.component';
import { BannerComponent } from './pages/home/banner/banner.component';
import { BodyHomeComponent } from './pages/home/body-home/body-home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    WrapperLoginComponent,
    LoginComponent,
    SignupComponent,
    SlideshowComponent,
    BannerComponent,
    BodyHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatSelectModule,
    OwlModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ Title, UtilsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
