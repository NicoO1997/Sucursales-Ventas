import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaBotonesComponent } from './tabla-botones/tabla-botones.component';
import { GraficoComponent } from './grafico/grafico.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: 'tabla', component: TablaBotonesComponent },
  { path: 'grafico', component: GraficoComponent },
  { path: 'sucursales', component: SucursalesComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'clientes', component: ClientesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
