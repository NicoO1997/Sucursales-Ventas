import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaBotonesComponent } from './tabla-botones/tabla-botones.component';
import { GraficoComponent } from './grafico/grafico.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

import { AuthGuard } from './auth-guard.guard';
import { AdminGuard } from './admin-guard.guard';
import { PublicGuard } from './public-guard.guard';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [PublicGuard]
  },
  { 
    path: 'registro', 
    component: RegistroComponent,
    canActivate: [PublicGuard]
  },
  { 
    path: 'inicio', 
    component: InicioComponent 
  },
  
  { 
    path: 'tabla', 
    component: TablaBotonesComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'grafico', 
    component: GraficoComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'sucursales', 
    component: SucursalesComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'clientes', 
    component: ClientesComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { 
    path: '', 
    redirectTo: '/inicio', 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
