import { Component } from '@angular/core';
import { EditarFacturasComponent } from '../../shared/components/modal/editar-facturas/editar-facturas.component';
import { Factura } from '../../core/model/Factura';
import { FacturaService } from '../../core/services/factura.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EditarFacturasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  facturas: Factura[] = [];
  mensajeFacturas: string = '';

  constructor(private _facturaService: FacturaService) {}

  ngOnInit(): void {
    this._facturaService.getAllFacturas().subscribe((facturas) => {
      if (facturas.mensaje == 'No hay registros') {
        this.mensajeFacturas = facturas.mensaje;
        this.facturas = [];
      } else {
        this.facturas = facturas.objeto;
        this.mensajeFacturas = facturas.mensaje;
      }
      console.log(this.mensajeFacturas, this.facturas);
    });
  }
}
