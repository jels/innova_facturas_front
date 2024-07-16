import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '../../../core/services/user.service';
import { EmpresaService } from '../../../core/services/empresa.service';
import { User } from '../../../core/model/User';
import { Cliente } from '../../../core/model/Cliente';
import { Empresa } from '../../../core/model/Empresa';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.css',
})
export class DefaultComponent {
  idCliente = 0;
  idUser = 1;
  user: User;

  clientes: Cliente[] = [];

  cliente: Cliente;
  mensaje: string = '';
  formCliente: FormGroup;

  empresa: Empresa;

  constructor(
    private _userService: UserService,
    private _empresaService: EmpresaService,
    private fb: FormBuilder
  ) {
    this.formCliente = this.fb.group({
      nombreCliente: ['', Validators.required],
      rucCliente: ['', Validators.required],
      dvRucCliente: ['', Validators.required],
      direccionCliente: ['', Validators.required],
      telefonoCliente: ['', Validators.required],
      correoCliente: ['', Validators.required],
      fechaCierreCliente: ['', Validators.required],
    });

    this.cliente = {
      idCliente: 0,
      empresa: {
        idEmpresa: 0,
        nombreEmpresa: '',
        rucEmpresa: '',
        direccionEmpresa: '',
        telefonoEmpresa: '',
        correoEmpresa: '',
        statusEmpresa: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 0,
        updatedBy: 0,
      },
      ruc: '',
      nombreCliente: '',
      rucCliente: '',
      dvRucCliente: '',
      direccionCliente: '',
      telefonoCliente: '',
      correoCliente: '',
      estadoCliente: '',
      fechaCierreCliente: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 0,
      updatedBy: 0,
    };

    this.user = {
      idUser: 0,
      idEmpresa: 0,
      rol: {
        idRol: 0,
        nombreRol: '',
        statusRol: '',
        createdAt: new Date(),
        createdBy: 0,
        updatedAt: new Date(),
        updatedBy: 0,
      },
      username: '',
      password: '',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      persona: {
        idPersona: 0,
        nombrePersona: '',
        apellidoPersona: '',
        telefonoPersona: '',
        ciPersona: '',
        statusPersona: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: 0,
        createdBy: 0,
      },
      statusUser: '',
      createdBy: 0,
    };

    this.empresa = {
      idEmpresa: 0,
      nombreEmpresa: '',
      rucEmpresa: '',
      direccionEmpresa: '',
      telefonoEmpresa: '',
      correoEmpresa: '',
      statusEmpresa: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 0,
      updatedBy: 0,
    };
  }

  ngOnInit(): void {
    this._userService.getUserById(this.idUser).subscribe((user) => {
      this.user = user.objeto;
      console.log('El usuario es: ', this.user);

      this._empresaService
        .getEmpresa(this.user.idEmpresa)
        .subscribe((empresa) => {
          this.empresa = empresa.objeto;
          console.log('La empresa es: ', this.empresa);
        });
    });

    // this._clienteService.getAllClientes().subscribe((clients) => {
    //   if (clients.mensaje == 'No hay registros') {
    //     this.mensaje = clients.mensaje;
    //     this.clientes = [];
    //   } else {
    //     this.clientes = clients.objeto;
    //     this.mensaje = clients.mensaje;
    //   }
    //   console.log(this.mensaje, this.clientes);
    // });
  }
}
