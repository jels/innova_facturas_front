export class Persona {
  idPersona: number;
  nombrePersona: string;
  apellidoPersona: string;
  telefonoPersona: string;
  ciPersona: string;
  statusPersona: string;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: number;
  createdBy: number;

  constructor(
    idPersona: number,
    nombrePersona: string,
    apellidoPersona: string,
    telefonoPersona: string,
    ciPersona: string,
    statusPersona: string,
    createdAt: Date,
    updatedAt: Date,
    updatedBy: number,
    createdBy: number
  ) {
    this.idPersona = idPersona;
    this.nombrePersona = nombrePersona;
    this.apellidoPersona = apellidoPersona;
    this.telefonoPersona = telefonoPersona;
    this.ciPersona = ciPersona;
    this.statusPersona = statusPersona;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
    this.createdBy = createdBy;
  }
}
