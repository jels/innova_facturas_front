import { Component } from '@angular/core';
import { Rol } from '../../core/model/Rol';
import { User } from '../../core/model/User';
import { RolService } from '../../core/services/rol.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  usuarios: User[] = [];
  roles: Rol[] = [];
  mensajeRol: string = '';
  mensajeUser: string = '';
  constructor(
    private _userService: UserService,
    private _rolService: RolService
  ) {}

  ngOnInit(): void {
    this._rolService.getAllRoles().subscribe((roles) => {
      console.log(roles);
      if (roles.mensaje == 'No hay registros') {
        this.mensajeRol = roles.mensaje;
        this.roles = [];
      } else {
        console.log(roles.objeto);

        this.roles = roles.objeto;
        this.mensajeRol = roles.mensaje;
      }
      console.log(this.mensajeRol, this.roles);
    });
    this._userService.getAllUsers().subscribe((users) => {
      if (users.mensaje == 'No hay registros') {
        this.mensajeUser = users.mensaje;
        this.usuarios = [];
      } else {
        this.usuarios = users.objeto;
        this.mensajeUser = users.mensaje;
      }
      console.log(this.mensajeUser, this.usuarios);
    });
  }
}
