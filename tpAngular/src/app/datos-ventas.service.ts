import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosVentasService {

  url= 'http://localhost/tpSucursales/';

  constructor(private http: HttpClient) { }
  recuperarTodos() {
    return this.http.get('localhost/tpSucursales/recuperartodos.php');
  }
  recuperarMeses() {
    return this.http.get(`${this.url}Get_Meses.php`);
  }
  recuperarSucus() {
    return this.http.get(`${this.url}Get_Sucus.php`);
  }
  recuperarClientes() {
    return this.http.get(`${this.url}Get_Clientes.php`);
  }
  recuperarVentas() {
    return this.http.get(`${this.url}Get_Ventas.php`);
  }
}
