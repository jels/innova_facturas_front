import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFacturasComponent } from './editar-facturas.component';

describe('EditarFacturasComponent', () => {
  let component: EditarFacturasComponent;
  let fixture: ComponentFixture<EditarFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFacturasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
