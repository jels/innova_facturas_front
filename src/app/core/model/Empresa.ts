export class Empresa {
  idEmpresa: Number;
  nombreEmpresa: string;
  rucEmpresa: string;
  direccionEmpresa: string;
  telefonoEmpresa: string;
  correoEmpresa: string;
  statusEmpresa: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Number;
  updatedBy: Number;

  constructor(
    idEmpresa: Number,
    nombreEmpresa: string,
    rucEmpresa: string,
    direccionEmpresa: string,
    telefonoEmpresa: string,
    correoEmpresa: string,
    statusEmpresa: string,
    createdAt: Date,
    updatedAt: Date,
    createdBy: Number,
    updatedBy: Number
  ) {
    this.idEmpresa = idEmpresa;
    this.nombreEmpresa = nombreEmpresa;
    this.rucEmpresa = rucEmpresa;
    this.direccionEmpresa = direccionEmpresa;
    this.telefonoEmpresa = telefonoEmpresa;
    this.correoEmpresa = correoEmpresa;
    this.statusEmpresa = statusEmpresa;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
