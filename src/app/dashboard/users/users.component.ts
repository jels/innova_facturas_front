import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/model/User';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  usuarios: User[] = [];
  mensaje: string = '';
  constructor(private user_service: UserService) {}

  ngOnInit(): void {
    this.user_service.getAllUsers().subscribe((users) => {
      if (users.mensaje == 'No hay registros') {
        this.mensaje = users.mensaje;
        this.usuarios = [];
      } else {
        this.usuarios = users.objeto;
        this.mensaje = users.mensaje;
      }
      console.log(this.mensaje, this.usuarios);
    });
  }
}
