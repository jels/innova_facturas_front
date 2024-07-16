import { Empresa } from './Empresa';

export class Ajuste {
  idAjuste: number | null;
  empresa: Empresa;
  nombreAjuste: string;
  acronimo: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;

  constructor(
    idAjuste: number,
    empresa: Empresa,
    nombreAjuste: string,
    acronimo: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    createdBy: number,
    updatedBy: number
  ) {
    this.idAjuste = idAjuste;
    this.empresa = empresa;
    this.nombreAjuste = nombreAjuste;
    this.acronimo = acronimo;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
