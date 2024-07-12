import { User } from './User';

export class Rol {
  idRol: number;
  nombreRol: string;
  statusRol: string;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;

  constructor(
    idRol: number,
    nombreRol: string,
    statusRol: string,
    createdAt: Date,
    createdBy: number,
    updatedAt: Date,
    updatedBy: number
  ) {
    this.idRol = idRol;
    this.nombreRol = nombreRol;
    this.statusRol = statusRol;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
  }
}
