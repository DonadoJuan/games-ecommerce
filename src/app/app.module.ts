import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from "@angular/material";
import { MatStepperModule } from "@angular/material";
import { OwlModule } from 'ngx-owl-carousel';
import { Ng2SmartTableModule } from 'ng2-smart-table';

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
import { VideojuegosComponent } from './pages/videojuegos/videojuegos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AdminSlideshowComponent } from './pages/admin/admin-slideshow/admin-slideshow.component';
import { CheckboxComponent } from './pages/admin/checkbox.component';
import { AdminVideojuegosComponent } from './pages/admin/admin-videojuegos/admin-videojuegos.component';
import { NumberComponent } from './pages/admin/number.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { CartWizardComponent } from './pages/cart-wizard/cart-wizard.component';

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
    BodyHomeComponent,
    VideojuegosComponent,
    UsuariosComponent,
    AdminSlideshowComponent,
    CheckboxComponent,
    AdminVideojuegosComponent,
    NumberComponent,
    PedidosComponent,
    UsuariosComponent,
    GameDetailsComponent,
    CartWizardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatStepperModule,
    OwlModule,
    AngularMultiSelectModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
    CheckboxComponent,
    NumberComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ Title, UtilsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
