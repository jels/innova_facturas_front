import { Component } from '@angular/core';
import { RgFactura } from '../../core/model/RgFactura';
import { User } from '../../core/model/User';
import { Cliente } from '../../core/model/Cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa } from '../../core/model/Empresa';
import { ClienteService } from '../../core/services/cliente.service';
import { UserService } from '../../core/services/user.service';
import { EmpresaService } from '../../core/services/empresa.service';
import { CsvService } from '../../core/services/csv.service';
import { ZipService } from '../../core/services/zip.service';
import { RgfacturaService } from '../../core/services/rgfactura.service';
import { FormularioRG90 } from '../../core/model/FormularioRG90';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  idCliente = 0;
  idUser = 1;
  user: User;

  clientes: Cliente[] = [];

  rgFacturas: RgFactura[] = [];

  cliente: Cliente;
  mensaje: string = '';
  formCliente: FormGroup;

  empresa: Empresa;

  rgFactura: RgFactura;

  formularioRg90: FormularioRG90;
  facturasRq90: FormularioRG90[] = [];

  constructor(
    private _clienteService: ClienteService,
    private fb: FormBuilder,
    private _userService: UserService,
    private _empresaService: EmpresaService,
    private _rgfacturaService: RgfacturaService,
    private csvService: CsvService,
    private zipService: ZipService
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

    this.formularioRg90 = {
      codigoTipoRegistro: '',
      codigoTipoComprador: '',
      nroIdentificadorComprador: '',
      nombreComprador: '',
      codigoTipoComprobante: '',
      fechaEmision: '',
      nroTimbrado: '',
      nroComprobante: '',
      montoIva10: '',
      montoIva5: '',
      montoExenta: '',
      montoTotalComprobante: '',
      condicionVenta: '',
      monedaExtranjera: '',
      imputaIva: '',
      imputaIre: '',
      imputaIrpRsp: '',
      comprobanteAsociado: '',
      timbradoComprobanteAsociado: '',
    };

    this.rgFactura = {
      idRgFactura: 0,
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
      mesPeriodo: '',
      anhoPeriodo: '',
      codigoTipoRegistro: '',
      codigoTipoComprador: '',
      nroIdentificadorComprador: '',
      nombreComprador: '',
      codigoTipoComprobante: '',
      fechaEmision: '',
      nroTimbrado: '',
      nroComprobante: '',
      montoIva10: '',
      montoIva5: '',
      montoExenta: '',
      montoTotalComprobante: '',
      condicionVenta: '',
      monedaExtranjera: '',
      imputaIva: '',
      imputaIre: '',
      imputaIrpRsp: '',
      comprobanteAsociado: '',
      timbradoComprobanteAsociado: '',
      createdBy: 0,
      createdAt: new Date(),
      updatedBy: 0,
      updatedAt: new Date(),
    };

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

    this._rgfacturaService.getAllRgFacturas().subscribe((formularioRg90) => {
      if (formularioRg90.mensaje == 'No hay registros') {
        this.mensaje = formularioRg90.mensaje;
        this.facturasRq90 = [];
      } else {
        this.facturasRq90 = formularioRg90.objeto;
        this.mensaje = formularioRg90.mensaje;
      }
      console.log(this.mensaje, this.facturasRq90);
    });
  }

  async downloadRG90() {
    let data: FormularioRG90[] = [];

    this.facturasRq90.forEach((facturasRq90) => {
      this.formularioRg90 = {
        codigoTipoRegistro: '',
        codigoTipoComprador: '',
        nroIdentificadorComprador: '',
        nombreComprador: '',
        codigoTipoComprobante: '',
        fechaEmision: '',
        nroTimbrado: '',
        nroComprobante: '',
        montoIva10: '',
        montoIva5: '',
        montoExenta: '',
        montoTotalComprobante: '',
        condicionVenta: '',
        monedaExtranjera: '',
        imputaIva: '',
        imputaIre: '',
        imputaIrpRsp: '',
        comprobanteAsociado: '',
        timbradoComprobanteAsociado: '',
      };

      this.formularioRg90.codigoTipoRegistro = facturasRq90.codigoTipoRegistro;
      this.formularioRg90.codigoTipoComprador =
        facturasRq90.codigoTipoComprador;
      this.formularioRg90.nroIdentificadorComprador =
        facturasRq90.nroIdentificadorComprador;
      this.formularioRg90.nombreComprador = facturasRq90.nombreComprador;
      this.formularioRg90.codigoTipoComprobante =
        facturasRq90.codigoTipoComprador;
      this.formularioRg90.fechaEmision = facturasRq90.fechaEmision;
      this.formularioRg90.nroTimbrado = facturasRq90.nroTimbrado;
      this.formularioRg90.nroComprobante = facturasRq90.nroComprobante;
      this.formularioRg90.montoIva10 = facturasRq90.montoIva10;
      this.formularioRg90.montoIva5 = facturasRq90.montoIva5;
      this.formularioRg90.montoExenta = facturasRq90.montoExenta;
      this.formularioRg90.montoTotalComprobante =
        facturasRq90.montoTotalComprobante;
      this.formularioRg90.condicionVenta = facturasRq90.condicionVenta;
      this.formularioRg90.monedaExtranjera = facturasRq90.monedaExtranjera;
      this.formularioRg90.imputaIva = facturasRq90.imputaIva;
      this.formularioRg90.imputaIre = facturasRq90.imputaIre;
      this.formularioRg90.imputaIrpRsp = facturasRq90.imputaIrpRsp;
      this.formularioRg90.comprobanteAsociado =
        facturasRq90.comprobanteAsociado;
      this.formularioRg90.timbradoComprobanteAsociado =
        facturasRq90.timbradoComprobanteAsociado;
      data.push(this.formularioRg90);
    });
    // const headers = ['Name', 'Age', 'Email'];
    // const data = [
    //   { Name: 'John Doe', Age: 30, Email: 'john.doe@example.com' },
    //   { Name: 'Jane Smith', Age: 25, Email: 'jane.smith@example.com' },
    // ];

    const ruc = '3968935';
    const periodo = '03' + '2024';
    const tipoFormulario = 'REG';

    let nombreArchivo =
      ruc + '_' + tipoFormulario + '_' + periodo + '_' + '20083';

    const csvBlob = this.csvService.generateCsv(data);
    const zipBlob = await this.zipService.compressCsvFile(
      csvBlob,
      nombreArchivo + '.csv'
    );

    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = nombreArchivo + '.zip';
    link.click();
  }
}
