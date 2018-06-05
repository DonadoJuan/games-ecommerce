import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WrapperLoginComponent } from "./pages/wrapper-login/wrapper-login.component";
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { VideojuegosComponent } from './pages/videojuegos/videojuegos.component';
import { AdminSlideshowComponent } from "./pages/admin/admin-slideshow/admin-slideshow.component";
import { AdminVideojuegosComponent } from "./pages/admin/admin-videojuegos/admin-videojuegos.component";
import { PedidosComponent } from "./pages/pedidos/pedidos.component";
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { CartWizardComponent } from './pages/cart-wizard/cart-wizard.component';
import { AdminEmpleadosComponent } from "./pages/admin/admin-empleados/admin-empleados.component";
import { AdminEmpleadosFormComponent } from "./pages/admin/admin-empleados/admin-empleados-form/admin-empleados-form.component";
import { ListaNegraComponent } from "./pages/admin/usuarios/lista-negra/lista-negra.component";
import { FormVideojuegosComponent } from './pages/admin/admin-videojuegos/form-videojuegos/form-videojuegos.component';
import { AdminStockComponent } from "./pages/admin/admin-stock/admin-stock.component";
import { FormUsuariosComponent } from './pages/admin/usuarios/form-usuarios/form-usuarios.component';
import { AdminConsultaStockComponent } from "./pages/admin/admin-consulta-stock/admin-consulta-stock.component";
import { AdminDescuentosComponent } from "./pages/admin/admin-descuentos/admin-descuentos.component";
import { OfertasComponent } from "./pages/ofertas/ofertas.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'wrapper-login',
    component: WrapperLoginComponent
  },
  {
    path: 'videojuegos',
    component: VideojuegosComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'ofertas',
    component: OfertasComponent
  },
  {
    path: 'lista-negra',
    component: ListaNegraComponent
  },
  {
    path: 'admin-slideshow',
    component: AdminSlideshowComponent
  },
  {
    path: 'admin-videojuegos',
    component: AdminVideojuegosComponent
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  },
  {
    path: 'game-details',
    component: GameDetailsComponent
  },
  {
    path: 'cart-wizard',
    component: CartWizardComponent
  },
  {
    path: 'admin-empleados',
    component: AdminEmpleadosComponent
  },
  {
    path: 'admin-empleados-form',
    component: AdminEmpleadosFormComponent
  },
  {
    path: 'admin-videojuegos-form',
    component: FormVideojuegosComponent
  },
  {
    path: 'admin-usuarios-form',
    component: FormUsuariosComponent
  },
  {
    path: 'admin-stock',
    component: AdminStockComponent
  },
  {
    path: 'admin-consulta-stock',
    component: AdminConsultaStockComponent
  },
  {
    path: 'admin-descuentos',
    component: AdminDescuentosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
