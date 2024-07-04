import { User } from './User';

export class Factura {
  idFactura: number | null;

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
  fechaInicioVigenciaFactura: string;
  fechaFinVigenciaFactura: string | null;
  fechaEmisionFactura: string;

  montoTotalFactura: number;
  montoTotalIvaFactura: number | null;
  monto5Factura: number | null;
  monto10Factura: number | null;
  excentaFactura: number | null;

  createdAt: string;
  updatedAt: string;

  updatedBy: User | null;
  createdBy: User | null;

  constructor(
    idFactura: number,
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
    fechaInicioVigenciaFactura: string,
    fechaFinVigenciaFactura: string,
    fechaEmisionFactura: string,
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
