import { Component } from '@angular/core';
import { Cliente } from '../../core/model/Cliente';
import { ClienteService } from '../../core/services/cliente.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Empresa } from '../../core/model/Empresa';
import { UserService } from '../../core/services/user.service';
import { EmpresaService } from '../../core/services/empresa.service';
import { User } from '../../core/model/User';

@Component({
  selector: 'app-clients',
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
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent {
  idCliente = 0;
  idUser = 1;
  user: User;

  clientes: Cliente[] = [];

  cliente: Cliente;
  mensaje: string = '';
  formCliente: FormGroup;

  empresa: Empresa;

  constructor(
    private _clienteService: ClienteService,
    private fb: FormBuilder,
    private _userService: UserService,
    private _empresaService: EmpresaService
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

    this._clienteService.getAllClientes().subscribe((clients) => {
      if (clients.mensaje == 'No hay registros') {
        this.mensaje = clients.mensaje;
        this.clientes = [];
      } else {
        this.clientes = clients.objeto;
        this.mensaje = clients.mensaje;
      }
      console.log(this.mensaje, this.clientes);
    });
  }

  nuevoCliente() {
    console.log('Form Cliente Creado: ', this.formCliente.value);
    this.cliente.empresa = this.empresa;
    this.cliente.ruc =
      this.formCliente.value.rucCliente +
      '-' +
      this.formCliente.value.dvRucCliente;
    this.cliente.dvRucCliente = this.formCliente.value.dvRucCliente;
    this.cliente.nombreCliente =
      this.formCliente.value.nombreCliente.toUpperCase();
    this.cliente.rucCliente = this.formCliente.value.rucCliente;
    this.cliente.direccionCliente =
      this.formCliente.value.direccionCliente.toUpperCase();
    this.cliente.telefonoCliente = this.formCliente.value.telefonoCliente;
    this.cliente.correoCliente = this.formCliente.value.correoCliente;
    this.cliente.estadoCliente = 'ACTIVO'.toUpperCase();
    this.cliente.fechaCierreCliente = this.formCliente.value.fechaCierreCliente;
    this.cliente.createdAt = new Date();
    this.cliente.updatedAt = new Date();
    this.cliente.createdBy = this.user.idUser != null ? this.user.idUser : 1;
    this.cliente.updatedBy = this.user.idUser != null ? this.user.idUser : 1;

    console.log('el Cliente es: ', this.cliente);

    this._clienteService.newCliente(this.cliente).subscribe((resp) => {
      console.log(resp.mensaje);
      if (resp.mensaje === 'CREADO') {
        this._clienteService.getAllClientes().subscribe((cli) => {
          this.clientes = [];
          this.clientes = cli.objeto;
          this.formCliente.reset();
        });
      } else {
        console.log(resp.mensaje);
      }
    });
  }

  modalCliente(cliente: Cliente) {
    this.idCliente = cliente.idCliente!;
    this.formCliente = this.fb.group({
      nombreCliente: [cliente.nombreCliente, Validators.required],
      rucCliente: [cliente.rucCliente, Validators.required],
      dvRucCliente: [cliente.dvRucCliente, Validators.required],
      direccionCliente: [cliente.direccionCliente, Validators.required],
      telefonoCliente: [cliente.telefonoCliente, Validators.required],
      correoCliente: [cliente.correoCliente, Validators.required],
      fechaCierreCliente: [cliente.fechaCierreCliente, Validators.required],
    });
    console.log('Form Cliente Actualizado: ', this.formCliente.value);
  }

  updateCliente(id: number) {
    this.cliente.idCliente = id;
    this.cliente.empresa = this.empresa;
    this.cliente.ruc =
      this.formCliente.value.rucCliente +
      '-' +
      this.formCliente.value.dvRucCliente;
    this.cliente.dvRucCliente = this.formCliente.value.dvRucCliente;
    this.cliente.nombreCliente =
      this.formCliente.value.nombreCliente.toUpperCase();
    this.cliente.rucCliente = this.formCliente.value.rucCliente;
    this.cliente.direccionCliente =
      this.formCliente.value.direccionCliente.toUpperCase();
    this.cliente.telefonoCliente = this.formCliente.value.telefonoCliente;
    this.cliente.correoCliente = this.formCliente.value.correoCliente;
    this.cliente.estadoCliente = 'ACTIVO'.toUpperCase();
    this.cliente.fechaCierreCliente = this.formCliente.value.fechaCierreCliente;
    this.cliente.createdAt = new Date();
    this.cliente.updatedAt = new Date();
    this.cliente.createdBy = this.user.idUser != null ? this.user.idUser : 1;
    this.cliente.updatedBy = this.user.idUser != null ? this.user.idUser : 1;

    console.log('el Cliente Actualizado sera: ', this.cliente);

    this._clienteService
      .updateCliente(this.cliente, this.cliente.idCliente)
      .subscribe((resp) => {
        console.log(resp.mensaje);
        if (resp.mensaje === 'ACTUALIZADO') {
          this._clienteService.getAllClientes().subscribe((cli) => {
            this.clientes = [];
            this.clientes = cli.objeto;
            this.formCliente.reset();
          });
        } else {
          console.log(resp.mensaje);
        }
      });
  }

  clean() {
    this.formCliente.reset();
  }

  cambiarEstado(cliente: Cliente, estado: string) {
    console.log(cliente, estado);

    this.cliente = cliente;
    this.cliente.estadoCliente = estado;

    console.log(cliente, estado);

    this._clienteService
      .updateCliente(cliente, cliente.idCliente != null ? cliente.idCliente : 0)

      .subscribe((resp) => {
        console.log(resp.mensaje);
        if (resp.mensaje === 'ACTUALIZADO') {
          this._clienteService.getAllClientes().subscribe((cli) => {
            this.clientes = [];
            this.clientes = cli.objeto;
            this.formCliente.reset();
          });
        } else {
          console.log(resp.mensaje);
        }
      });
  }
}
