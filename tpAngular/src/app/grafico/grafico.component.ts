import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SucursalesService } from '../sucursales.service';
import { forkJoin } from 'rxjs';
import { Color, ScaleType } from '@swimlane/ngx-charts';

interface Venta {
  Suc1: number;
  Suc2: number;
  Suc3: number;
  Suc4: number;
  Suc5: number;
}

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css'],
  animations: []
})
export class GraficoComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  // Datos para los gráficos
  datosLinea: any[] = [];
  datosBarra: any[] = [];
  datosBarraApilada: any[] = [];
  // view: [number, number] | undefined;
  
  // Configuración común para los gráficos
  view: [number, number] = [900, 600];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Mes';
  yAxisLabel: string = 'Ventas';
  timeline: boolean = false;
  
  // Esquema de colores actualizado
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d']
  };

  constructor(private sucursalService: SucursalesService) {}

  ngAfterViewInit(): void {
    // Espera a que el DOM esté listo
    setTimeout(() => {
      this.updateChartSize();
    });
  }

  private updateChartSize(): void {
    if (this.chartContainer) {
      const containerWidth = this.chartContainer.nativeElement.offsetWidth;
      this.view = [containerWidth, 400];
    }
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    forkJoin({
      meses: this.sucursalService.recuperarMeses(),
      sucursales: this.sucursalService.recuperarSucus(),
      ventas: this.sucursalService.recuperarVentas()
    }).subscribe({
      next: (result) => {
        this.procesarDatosParaGraficos(result.meses, result.sucursales, result.ventas);
      },
      error: (error) => {
        console.error('Error al cargar los datos:', error);
      }
    });
  }

  private procesarDatosParaGraficos(meses: string[], sucursales: string[], ventas: Venta[]): void {
    // Datos para gráfico de línea y barras se mantienen igual
    this.datosLinea = sucursales.map((sucursal, index) => {
      return {
        name: sucursal,
        series: meses.map((mes, mesIndex) => ({
          name: mes,
          value: ventas[mesIndex][`Suc${index + 1}` as keyof Venta]
        }))
      };
    });

    this.datosBarra = meses.map((mes, index) => ({
      name: mes,
      series: sucursales.map((sucursal, sucIndex) => ({
        name: sucursal,
        value: ventas[index][`Suc${sucIndex + 1}` as keyof Venta]
      }))
    }));

    // Nueva forma de procesar datos para barras apiladas
    this.datosBarraApilada = meses.map((mes, mesIndex) => {
      const item: any = {
        name: mes,
        series: sucursales.map((sucursal, sucIndex) => {
          return {
            name: sucursal,
            value: ventas[mesIndex][`Suc${sucIndex + 1}` as keyof Venta]
          };
        })
      };
      return item;
    });
  }

  onSelect(event: any): void {
    console.log('Elemento seleccionado:', event);
  }

  onResize(event: any): void {
    this.view = [event.target.innerWidth / 1.35, 400];
    setTimeout(() => {
      this.updateChartSize();
    });
  }
}