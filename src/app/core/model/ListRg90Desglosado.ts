import { RgFactura } from './RgFactura';

export interface ListRg90Desglosado {
  ruc: string;
  razonSocial: string;
  anho: string;
  mes: string;
  estadoRg90: string;
  rgFactura: RgFactura[];
}
