import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosDetalleComponent } from './cursos-detalle.component';

describe('CursosDetalleComponent', () => {
  let component: CursosDetalleComponent;
  let fixture: ComponentFixture<CursosDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
