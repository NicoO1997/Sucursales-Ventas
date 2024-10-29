import { TestBed } from '@angular/core/testing';

import { DatosVentasService } from './datos-ventas.service';

describe('DatosVentasService', () => {
  let service: DatosVentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosVentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
