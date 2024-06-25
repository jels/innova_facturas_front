import { Component } from '@angular/core';
import { EditarFacturasComponent } from '../../shared/components/modal/editar-facturas/editar-facturas.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EditarFacturasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
