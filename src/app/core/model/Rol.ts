import { User } from './User';

export class Rol {
  idRol: number;
  nombreRol: string;
  statusRol: string;
  createdAt: Date;
  createdBy: User;
  updatedAt: Date;
  updatedBy: User;

  constructor(
    idRol: number,
    nombreRol: string,
    statusRol: string,
    createdAt: Date,
    createdBy: User,
    updatedAt: Date,
    updatedBy: User
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
