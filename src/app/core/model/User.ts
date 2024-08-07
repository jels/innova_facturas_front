import { Persona } from './Persona';
import { Rol } from './Rol';

export interface User {
  idUser: number | null;
  idEmpresa: number;
  rol: Rol;
  username: string;
  password: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  persona: Persona;
  statusUser: string;
  createdBy: number;

  // constructor(
  //   idUser: number,
  //   idEmpresa: number,
  //   rol: Rol,
  //   username: string,
  //   password: string,
  //   lastLogin: Date,
  //   createdAt: Date,
  //   updatedAt: Date,
  //   persona: Persona,
  //   statusUser: string,
  //   createdBy: number
  // ) {
  //   this.idUser = idUser;
  //   this.idEmpresa = idEmpresa;
  //   this.rol = rol;
  //   this.username = username;
  //   this.password = password;
  //   this.lastLogin = lastLogin;
  //   this.createdAt = createdAt;
  //   this.updatedAt = updatedAt;
  //   this.persona = persona;
  //   this.statusUser = statusUser;
  //   this.createdBy = createdBy;
  // }
}
