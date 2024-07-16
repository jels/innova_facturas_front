import { Empresa } from './Empresa';

export class RgFactura {
  idRgFactura: number;
  empresa: Empresa;
  mesPeriodo: string;
  anhoPeriodo: string;
  codigoTipoRegistro: string;
  codigoTipoComprador: string;
  nroIdentificadorComprador: string;
  nombreComprador: string;
  codigoTipoComprobante: string;
  fechaEmision: string;
  nroTimbrado: string;
  nroComprobante: string;
  montoIva10: string;
  montoIva5: string;
  montoExenta: string;
  montoTotalComprobante: string;
  condicionVenta: string;
  monedaExtranjera: string;
  imputaIva: string;
  imputaIre: string;
  imputaIrpRsp: string;
  comprobanteAsociado: string | null;
  timbradoComprobanteAsociado: string | null;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
  constructor(
    idRgFactura: number,
    empresa: Empresa,
    mesPeriodo: string,
    anhoPeriodo: string,
    codigoTipoRegistro: string,
    codigoTipoComprador: string,
    nroIdentificadorComprador: string,
    nombreComprador: string,
    codigoTipoComprobante: string,
    fechaEmision: string,
    nroTimbrado: string,
    nroComprobante: string,
    montoIva10: string,
    montoIva5: string,
    montoExenta: string,
    montoTotalComprobante: string,
    condicionVenta: string,
    monedaExtranjera: string,
    imputaIva: string,
    imputaIre: string,
    imputaIrpRsp: string,
    comprobanteAsociado: string,
    timbradoComprobanteAsociado: string,
    createdBy: number,
    createdAt: Date,
    updatedBy: number,
    updatedAt: Date
  ) {
    this.idRgFactura = idRgFactura;
    this.empresa = empresa;
    this.mesPeriodo = mesPeriodo;
    this.anhoPeriodo = anhoPeriodo;
    this.codigoTipoRegistro = codigoTipoRegistro;
    this.codigoTipoComprador = codigoTipoComprador;
    this.nroIdentificadorComprador = nroIdentificadorComprador;
    this.nombreComprador = nombreComprador;
    this.codigoTipoComprobante = codigoTipoComprobante;
    this.fechaEmision = fechaEmision;
    this.nroTimbrado = nroTimbrado;
    this.nroComprobante = nroComprobante;
    this.montoIva10 = montoIva10;
    this.montoIva5 = montoIva5;
    this.montoExenta = montoExenta;
    this.montoTotalComprobante = montoTotalComprobante;
    this.condicionVenta = condicionVenta;
    this.monedaExtranjera = monedaExtranjera;
    this.imputaIva = imputaIva;
    this.imputaIre = imputaIre;
    this.imputaIrpRsp = imputaIrpRsp;
    this.comprobanteAsociado = comprobanteAsociado;
    this.timbradoComprobanteAsociado = timbradoComprobanteAsociado;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
  }
}
