import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-editar-facturas',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './editar-facturas.component.html',
  styleUrl: './editar-facturas.component.css',
})
export class EditarFacturasComponent {
  CDC = '';
  facturaVirtual = false;
  facturaElectronica = false;
  otrosTiposFacturas = false;
  loading: boolean = false;

  rucEmisor: String = '';
  razonSocialEmisor = '';
  timbradoNro: String = '';
  fechaInicioVig: String = '';
  fechaFinVig: String = '';
  rucReceptor: String = '';
  razonSocialReceptor: String = '';
  nroFactura: String = '';
  fechaEmision: String = '';
  condicionVenta: String = '';
  montoTotal: String = '';
  montoIva10: String = '';
  montoIva5: String = '';
  montoExenta: String = '';
  montoTotalIVA: String = '';
  tipoFactura: String = '';
  codigoControl: String = '';
  tipoDato: String = '';
}
