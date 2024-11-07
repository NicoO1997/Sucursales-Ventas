// sucursales.component.ts
import { Component, OnInit } from '@angular/core';
import { SucursalesService } from '../sucursales.service';
import { ModalService } from '../modal.service';
import { AuthService, User } from '../auth.service';

interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  cantidadEmpleados: number;
}

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})

export class SucursalesComponent implements OnInit {
  sucursales: Sucursal[] = [];
  modoEdicion: boolean = false;
  sucursalSeleccionada: Sucursal | null = null;
  nuevaSucursal: Sucursal = {
    id: 0,
    nombre: '',
    direccion: '',
    cantidadEmpleados: 0
  };
  modalVisible$ = this.modalService.display$;
  isAdmin: boolean = false;

  constructor(
    private sucursalService: SucursalesService,
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarSucursales();
    this.authService.user$.subscribe((user) => {
      this.isAdmin = this.authService.isAdmin(user);
    });
  }

  cargarSucursales() {
    this.sucursalService.recuperarSucus2().subscribe({
      next: (data) => {
        this.sucursales = data;
      },
      error: (error) => {
        console.error('Error al cargar sucursales:', error);
      }
    });
  }

  abrirModal(sucursal?: Sucursal) {
    if (this.isAdmin) {
      this.modoEdicion = !!sucursal;
      if (sucursal) {
        this.sucursalSeleccionada = sucursal;
        this.nuevaSucursal = { ...sucursal };
      } else {
        this.resetForm();
      }
      this.modalService.open();
    } else {
      alert('No tienes permisos para editar sucursales');
    }
  }

  cerrarModal() {
    this.modalService.close();
    this.resetForm();
  }

  guardarSucursal() {
    if (this.isAdmin) {

      if (this.nuevaSucursal.nombre.trim() && this.nuevaSucursal.direccion.trim()) {
        const operacion = this.modoEdicion
          ? this.sucursalService.actualizarSucursal(this.nuevaSucursal)
          : this.sucursalService.agregarSucursal(this.nuevaSucursal);
  
        operacion.subscribe({
          next: (response) => {
            this.cargarSucursales();
            this.cerrarModal();
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
      }
    } else {
      alert('No tienes permisos para editar sucursales');
    }
  }

  eliminarSucursal(id: number) {
    if (this.isAdmin) {
      if (confirm('¿Estás seguro de que deseas eliminar esta sucursal?')) {
        this.sucursalService.eliminarSucursal(id).subscribe({
          next: () => {
            this.cargarSucursales();
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
          }
        });
      }
    } else{
      alert('No tienes permisos para eliminar sucursales');
    }
  }

  private resetForm() {
    this.nuevaSucursal = {
      id: 0,
      nombre: '',
      direccion: '',
      cantidadEmpleados: 0
    };
    this.modoEdicion = false;
    this.sucursalSeleccionada = null;
  }
}