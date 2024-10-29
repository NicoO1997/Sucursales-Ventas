import { Component } from '@angular/core';
import { SucursalesService } from '../sucursales.service';

interface Cliente {
  Apellido: string;
  Nombre: string;
  Saldo: number;
  Status: number;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  constructor (private sucursalesService: SucursalesService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.sucursalesService.recuperarClientes().subscribe({
      next: (data) => {
        console.log(data);
        this.clientes = data;
      },
      error: (error) => {
        console.error('Error al recuperar clientes:', error);
      }
    });
  }
}
