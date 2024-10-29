import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBotonesComponent } from './tabla-botones.component';

describe('TablaBotonesComponent', () => {
  let component: TablaBotonesComponent;
  let fixture: ComponentFixture<TablaBotonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaBotonesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaBotonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
