import { Persona } from './Persona';
import { Rol } from './Rol';

export class User {
  idUser: number;
  rol: Rol;
  username: string;
  password: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  persona: Persona;
  statusUser: string;
  createdBy: User;

  constructor(
    idUser: number,
    rol: Rol,
    username: string,
    password: string,
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date,
    persona: Persona,
    statusUser: string,
    createdBy: User
  ) {
    this.idUser = idUser;
    this.rol = rol;
    this.username = username;
    this.password = password;
    this.lastLogin = lastLogin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.persona = persona;
    this.statusUser = statusUser;
    this.createdBy = createdBy;
  }
}
