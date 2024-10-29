// sucursales.component.ts
import { Component, OnInit } from '@angular/core';
import { SucursalesService } from '../sucursales.service';
import { ModalService } from '../modal.service';

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

  constructor(
    private sucursalService: SucursalesService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.cargarSucursales();
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
    this.modoEdicion = !!sucursal;
    if (sucursal) {
      this.sucursalSeleccionada = sucursal;
      this.nuevaSucursal = { ...sucursal };
    } else {
      this.resetForm();
    }
    this.modalService.open();
  }

  cerrarModal() {
    this.modalService.close();
    this.resetForm();
  }

  guardarSucursal() {
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
  }

  eliminarSucursal(id: number) {
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