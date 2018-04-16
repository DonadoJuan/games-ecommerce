import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WrapperLoginComponent } from "./pages/wrapper-login/wrapper-login.component";
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { VideojuegosComponent } from './pages/videojuegos/videojuegos.component';
import { AdminSlideshowComponent } from "./pages/admin/admin-slideshow/admin-slideshow.component";
import { AdminVideojuegosComponent } from "./pages/admin/admin-videojuegos/admin-videojuegos.component";
import { PedidosComponent } from "./pages/pedidos/pedidos.component";
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { CartWizardComponent } from './pages/cart-wizard/cart-wizard.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
