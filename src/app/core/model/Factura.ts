import { Empresa } from './Empresa';
import { User } from './User';

export class Factura {
  idFactura: number | null;

  empresa: Empresa;
  tipoFactura: string;
  timbradoFactura: string;
  cdcFactura: string | null;
  codigoControlFactura: string | null;
  numeroFactura: string;
  rucEmisorFactura: string;
  razonSocialEmisorFactura: string;
  rucReceptorFactura: string;
  razonSocialReceptorFactura: string;
  condicionVentaFactura: string;
  statusFactura: string | null;
  fechaInicioVigenciaFactura: Date;
  fechaFinVigenciaFactura: Date | null;
  fechaEmisionFactura: Date;

  montoTotalFactura: number;
  montoTotalIvaFactura: number;
  monto5Factura: number;
  monto10Factura: number;
  excentaFactura: number;

  createdAt: string;
  updatedAt: string;

  updatedBy: User;
  createdBy: User;

  constructor(
    idFactura: number,
    empresa: Empresa,
    tipoFactura: string,
    timbradoFactura: string,
    cdcFactura: string,
    codigoControlFactura: string,
    numeroFactura: string,
    rucEmisorFactura: string,
    razonSocialEmisorFactura: string,
    rucReceptorFactura: string,
    razonSocialReceptorFactura: string,
    condicionVentaFactura: string,
    statusFactura: string,
    fechaInicioVigenciaFactura: Date,
    fechaFinVigenciaFactura: Date,
    fechaEmisionFactura: Date,
    montoTotalFactura: number,
    montoTotalIvaFactura: number,
    monto5Factura: number,
    monto10Factura: number,
    excentaFactura: number,
    createdAt: string,
    updatedAt: string,
    updatedBy: User,
    createdBy: User
  ) {
    this.idFactura = idFactura;
    this.empresa = empresa;
    this.tipoFactura = tipoFactura;
    this.timbradoFactura = timbradoFactura;
    this.cdcFactura = cdcFactura;
    this.codigoControlFactura = codigoControlFactura;
    this.numeroFactura = numeroFactura;
    this.rucEmisorFactura = rucEmisorFactura;
    this.razonSocialEmisorFactura = razonSocialEmisorFactura;
    this.rucReceptorFactura = rucReceptorFactura;
    this.razonSocialReceptorFactura = razonSocialReceptorFactura;
    this.condicionVentaFactura = condicionVentaFactura;
    this.statusFactura = statusFactura;
    this.fechaInicioVigenciaFactura = fechaInicioVigenciaFactura;
    this.fechaFinVigenciaFactura = fechaFinVigenciaFactura;
    this.fechaEmisionFactura = fechaEmisionFactura;
    this.montoTotalFactura = montoTotalFactura;
    this.montoTotalIvaFactura = montoTotalIvaFactura;
    this.monto5Factura = monto5Factura;
    this.monto10Factura = monto10Factura;
    this.excentaFactura = excentaFactura;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
    this.createdBy = createdBy;
  }
}
