import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WrapperLoginComponent } from "./pages/wrapper-login/wrapper-login.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'wrapper-login',
    component: WrapperLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
