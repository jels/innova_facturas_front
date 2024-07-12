import { Empresa } from './Empresa';
import { Persona } from './Persona';
import { Rol } from './Rol';

export class Cliente {
  idCliente: number | null;
  empresa: Empresa;
  ruc: string;
  nombreCliente: string;
  rucCliente: string;
  dvRucCliente: string;
  direccionCliente: string;
  telefonoCliente: string;
  correoCliente: string;
  estadoCliente: string;
  fechaCierreCliente: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;

  constructor(
    idCliente: number,
    empresa: Empresa,
    ruc: string,
    nombreCliente: string,
    rucCliente: string,
    dvRucCliente: string,
    direccionCliente: string,
    telefonoCliente: string,
    correoCliente: string,
    estadoCliente: string,
    fechaCierreCliente: number,
    createdAt: Date,
    updatedAt: Date,
    createdBy: number,
    updatedBy: number
  ) {
    this.idCliente = idCliente;
    this.empresa = empresa;
    this.ruc = ruc;
    this.nombreCliente = nombreCliente;
    this.rucCliente = rucCliente;
    this.dvRucCliente = dvRucCliente;
    this.direccionCliente = direccionCliente;
    this.telefonoCliente = telefonoCliente;
    this.correoCliente = correoCliente;
    this.estadoCliente = estadoCliente;
    this.fechaCierreCliente = fechaCierreCliente;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
