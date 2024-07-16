export class FormularioRG90 {
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

  constructor(
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
    timbradoComprobanteAsociado: string
  ) {
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
  }
}
