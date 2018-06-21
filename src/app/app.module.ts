import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md' ;
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from "@angular/material";
import { MatStepperModule } from "@angular/material";
import { OwlModule } from 'ngx-owl-carousel';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UtilsService } from './core/services/utils/utils.service';
import { WrapperLoginComponent } from './pages/wrapper-login/wrapper-login.component';
import { LoginComponent } from './pages/wrapper-login/login/login.component';
import { SignupComponent, signupClientSuccessDialog } from './pages/wrapper-login/signup/signup.component';
import { FormSignupService } from './pages/wrapper-login/signup/form-signup.service';


import { SlideshowComponent } from './pages/home/slideshow/slideshow.component';
import { BannerComponent } from './pages/home/banner/banner.component';
import { BodyHomeComponent } from './pages/home/body-home/body-home.component';
import { VideojuegosComponent } from './pages/videojuegos/videojuegos.component';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AdminSlideshowComponent } from './pages/admin/admin-slideshow/admin-slideshow.component';
import { CheckboxComponent } from './pages/admin/checkbox.component';
import { AdminVideojuegosComponent } from './pages/admin/admin-videojuegos/admin-videojuegos.component';
import { NumberComponent } from './pages/admin/number.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { CartWizardComponent, ConfirmPurchaseDialog } from './pages/cart-wizard/cart-wizard.component';
import { AdminEmpleadosComponent } from './pages/admin/admin-empleados/admin-empleados.component';
import { AdminEmpleadosFormComponent } from './pages/admin/admin-empleados/admin-empleados-form/admin-empleados-form.component';
import { ListaNegraComponent } from './pages/admin/usuarios/lista-negra/lista-negra.component';
import { FormVideojuegosComponent } from './pages/admin/admin-videojuegos/form-videojuegos/form-videojuegos.component';
import { FormVideojuegosService } from './pages/admin/admin-videojuegos/form-videojuegos/form-videojuegos-service.service';

import { AdminEmpleadosFormService } from "./pages/admin/admin-empleados/admin-empleados-form/admin-empleados-form.service";
import { LoadingComponent } from './core/loading.component';
import { SubmittingComponent } from './core/submitting.component';
import { ConfirmDeleteDialog } from "./pages/admin/admin-empleados/admin-empleados.component";


import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { AdminStockComponent } from './pages/admin/admin-stock/admin-stock.component';
import { ButtonListaNegraComponent } from './pages/admin/usuarios/button-lista-negra.component';
import { ButtonDetailsComponent } from './pages/admin/usuarios/button-details/button-details.component';
import { BaseService } from './core/services/base/base.service';
import { ClienteService } from './core/services/cliente/cliente.service';
import { SucursalService } from './core/services/sucursal/sucursal.service';
import { PersonalService } from './core/services/personal/personal.service';
import { AuthService } from './core/services/auth/auth.service';
import { VideojuegoService } from './core/services/videojuego/videojuego.service';
import { FormUsuariosComponent } from './pages/admin/usuarios/form-usuarios/form-usuarios.component';
import { AdminConsultaStockComponent } from './pages/admin/admin-consulta-stock/admin-consulta-stock.component';
import { ConfirmarItemCarritoComponent } from './core/dialogs/confirmar-item-carrito/confirmar-item-carrito.component';
import { CarritoService } from './core/services/carrito/carrito.service';
import { AdminDescuentosComponent } from './pages/admin/admin-descuentos/admin-descuentos.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { ButtonRestoreComponent } from './pages/admin/usuarios/button-restore/button-restore.component';
import { FormSliderComponent } from './pages/admin/admin-slideshow/form-slider/form-slider.component';
import { SliderService } from './core/services/slider/slider.service';
import { ConfirmEqualValidatorDirective } from './directives/confirm-equal-validator.directive';
import { AdminCuponDescuentoComponent } from './pages/admin/admin-cupon-descuento/admin-cupon-descuento.component';
import { CuponService } from './core/services/cupon/cupon.service';
import { FormCuponDescuentoComponent } from './pages/admin/admin-cupon-descuento/form-cupon-descuento/form-cupon-descuento.component';

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
    CartWizardComponent,
    AdminEmpleadosComponent,
    AdminEmpleadosFormComponent,
    ListaNegraComponent,
    FormVideojuegosComponent,
    ConfirmPurchaseDialog,
    LoadingComponent,
    SubmittingComponent,
    ConfirmDeleteDialog,
    AdminStockComponent,
    ButtonListaNegraComponent,
    ButtonDetailsComponent,
    signupClientSuccessDialog,
    FormUsuariosComponent,
    AdminConsultaStockComponent,
    AdminDescuentosComponent,
    ConfirmarItemCarritoComponent,
    OfertasComponent,
    ButtonRestoreComponent,
    FormSliderComponent,
    ConfirmEqualValidatorDirective,
    AdminCuponDescuentoComponent,
    FormCuponDescuentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatDividerModule,
    MatRadioModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    OwlModule,
    AngularMultiSelectModule,
    Ng2SmartTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule
    
  ],
  entryComponents: [
    CheckboxComponent,
    NumberComponent,
    ButtonListaNegraComponent,
    ButtonRestoreComponent,
    ButtonDetailsComponent,
    ConfirmPurchaseDialog,
    ConfirmDeleteDialog,
    signupClientSuccessDialog,
    ConfirmarItemCarritoComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ Title, 
    BaseService, 
    ClienteService,
    UtilsService, 
    AdminEmpleadosFormService,
    FormSignupService,
    VideojuegoService,
    SucursalService,
    PersonalService, 
    AuthService,
    SliderService,
    CuponService,
    CarritoService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
