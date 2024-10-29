import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

export interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  cantidadEmpleados: number;
}

@Injectable({
  providedIn: 'root'
})

export class SucursalesService {
  private baseUrl = 'http://localhost/tpSucursales/';

  constructor(private http: HttpClient) {}

  recuperarMeses(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}Get_Meses.php`).pipe(
      catchError(error => {
        console.error('Error en recuperarMeses:', error);
        throw error;
      })
    );
  }

  recuperarSucus(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}Get_Sucus.php`).pipe(
      catchError(error => {
        console.error('Error en recuperarSucus:', error);
        throw error;
      })
    );
  }

  recuperarSucus2(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(`${this.baseUrl}GetSucus2.php`).pipe(
      catchError(error => {
        console.error('Error en recuperarSucus2:', error);
        throw error;
      })
    );
  }
  
  agregarSucursal(sucursal: Sucursal): Observable<any> {
    return this.http.post(`${this.baseUrl}AddSucursal.php`, sucursal);
  }

  actualizarSucursal(sucursal: Sucursal): Observable<any> {
    return this.http.post(`${this.baseUrl}UpdateSucursal.php`, sucursal);
  }

  eliminarSucursal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteSucursal.php?id=${id}`);
  }

  recuperarVentas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}Get_Ventas.php`).pipe(
      catchError(error => {
        console.error('Error en recuperarVentas:', error);
        throw error;
      })
    );
  }

  actualizarVenta(id: number, sucursal: string, valor: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/UpdateVenta.php`, {
      id,
      sucursal,
      valor
    });
  }

  recuperarClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}Get_Clientes.php`).pipe(
      catchError(error => {
        console.error('Error en recuperarClientes:', error);
        throw error;
      })
    );
  }
}