import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesServicioComponent } from './detalles-servicio.component';

describe('DetallesServicioComponent', () => {
  let component: DetallesServicioComponent;
  let fixture: ComponentFixture<DetallesServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
