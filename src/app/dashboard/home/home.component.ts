import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DATE_LOCALE,
  MatRippleModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Cliente } from '../../core/model/Cliente';
import { Empresa } from '../../core/model/Empresa';
import { Factura } from '../../core/model/Factura';
import { User } from '../../core/model/User';
import { ClienteService } from '../../core/services/cliente.service';
import { EmpresaService } from '../../core/services/empresa.service';
import { FacturaService } from '../../core/services/factura.service';
import { UserService } from '../../core/services/user.service';
import { EditarFacturasComponent } from '../../shared/components/modal/editar-facturas/editar-facturas.component';
import { FechaPipe } from '../../shared/pipes/fecha.pipe';
import { FormatogsPipe } from '../../shared/pipes/formatogs.pipe';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

interface Meses {
  nombre: string;
  valor: number;
}

interface Anhos {
  nombre: string;
  valor: number;
}

interface Busqueda {
  nombre: string;
  valor: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    EditarFacturasComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    CommonModule,
    FormsModule,
    FechaPipe,
    ReactiveFormsModule,
    FormatogsPipe,
    MatSelectModule,
    MatDatepickerModule,
    MatIcon,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatRippleModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-PY' },
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = false;
  showFirstLastButtons = false;
  disabled = false;

  pageEvent!: PageEvent;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
  tipoDocumento = '11';
  tipoRegistro = '1';
  tipoComprobante = '109';
  imputaIva = 'S';
  imputaIre = 'N';
  imputaIrpRsp = 'N';
  restaurarBusqueda = false;
  facturas: Factura[] = [];
  facturasFiltradas: Factura[] = [];
  facturaVer: Factura[] = [];
  mensajeFacturas: string = '';
  tipoFactura: string = '';
  idUser = 1;
  user: User;
  empresa: Empresa;
  currentMes = new Date().getMonth();
  currentYear = new Date().getFullYear();

  factura: any;
  clientes: Cliente[] = [];

  filtros: any[] = [];

  formVirtual: FormGroup;

  formBusqueda: FormGroup;

  filtrosAplicados = false;
  mesSeleccionado = '';
  anhoSeleccionado = '';
  clienteSeleccionado = '';
  filtro = '';
  anhos: Anhos[] = [
    { nombre: '2024', valor: 2024 },
    { nombre: '2023', valor: 2023 },
    { nombre: '2022', valor: 2022 },
    { nombre: '2021', valor: 2021 },
    { nombre: '2020', valor: 2020 },
  ];
  meses: Meses[] = [
    { nombre: 'Enero', valor: 1 },
    { nombre: 'Febrero', valor: 2 },
    { nombre: 'Marzo', valor: 3 },
    { nombre: 'Abril', valor: 4 },
    { nombre: 'Mayo', valor: 5 },
    { nombre: 'Junio', valor: 6 },
    { nombre: 'Julio', valor: 7 },
    { nombre: 'Agosto', valor: 8 },
    { nombre: 'Septiembre', valor: 9 },
    { nombre: 'Octubre', valor: 10 },
    { nombre: 'Noviembre', valor: 11 },
    { nombre: 'Diciembre', valor: 12 },
  ];

  busquedas: Busqueda[] = [
    { nombre: 'Fecha', valor: 'Fecha' },
    { nombre: 'Nro Factura', valor: 'NroFactura' },
    { nombre: 'Tipo Factura', valor: 'TipoFactura' },
    { nombre: 'Condicion de Venta', valor: 'CondicionVenta' },
    { nombre: 'Ruc Emisor', valor: 'RucEmisor' },
    { nombre: 'Razon Social', valor: 'RazonSocial' },
  ];
  mesesControl = new FormControl(this.meses[this.currentMes].valor);
  clientesControl = new FormControl<Cliente | null>(null, Validators.required);
  anhosControl = new FormControl(this.anhos[0].valor);
  selectFormControl = new FormControl('', Validators.required);
  busquedaControl = new FormControl('', Validators.required);
  form = new FormGroup({
    meses: this.mesesControl,
    clientes: this.clientesControl,
    anhos: this.anhosControl,
  });
  timeZone: string = '';

  displayedColumns: string[] = [
    'id',
    'fecha',
    'numeroFactura',
    'tipoFactura',
    'condicion',
    'rucEmisorFactura',
    'rsEmisorFactura',
    'rucReceptorFactura',
    'rslReceptorFactura',
    'total',
    'acciones',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _facturaService: FacturaService,
    private fb: FormBuilder,
    private _userService: UserService,
    private _clienteService: ClienteService,
    private _empresaService: EmpresaService
  ) {
    this.dataSource = new MatTableDataSource();
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

    this.formVirtual = this.fb.group({
      codigoControl: ['', Validators.required],
      rucEmisor: ['', Validators.required],
      razonSocialEmisor: ['', Validators.required],
      timbradoNro: ['', Validators.required],
      fechaInicioVig: ['', Validators.required],
      rucReceptor: ['', Validators.required],
      razonSocialReceptor: ['', Validators.required],
      nroFactura: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      condicionVenta: ['', Validators.required],
      montoTotal: ['', Validators.required],
      montoIva10: ['', Validators.required],
      montoIva5: ['', Validators.required],
      montoExenta: ['', Validators.required],
      montoTotalIVA: ['', Validators.required],
      tipoFactura: ['', Validators.required],
    });

    this.formBusqueda = this.fb.group({
      textoBuscado: ['', Validators.required],
    });
    // const fecha = new Date();
    // this.anhoActual = fecha.getFullYear();
    // this.mesActual = fecha.getMonth() + 1;
    // let datos = [];
    // for (let index = 0; index < 5; index++) {
    //   const element = {
    //     nombre: '' + (this.anhoActual - index) + '',
    //     valor: this.anhoActual - index,
    //   };
    //   datos.push(element);
    // }
    // this.anhos = datos;
  }

  // ngAfterViewInit() {
  //   if (this.paginator) {
  //     this.dataSource.paginator = this.paginator;
  //   } else {
  //     console.error('Paginator is undefined');
  //   }
  //   this.dataSource.sort = this.sort;
  // }

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

    this._facturaService.getAllFacturas().subscribe((facturas) => {
      if (facturas.mensaje == 'No hay registros') {
        this.mensajeFacturas = facturas.mensaje;
        this.facturas = [];
      } else {
        this.facturas = facturas.objeto;
        this.mensajeFacturas = facturas.mensaje;
      }

      // this.dataSource = new MatTableDataSource(this.facturas);
      console.log(this.mensajeFacturas, this.facturas);
    });

    this._clienteService.getAllClientes().subscribe((clientes) => {
      this.clientes = clientes.objeto;
      console.log('Los clientes son: ', this.clientes);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  convertDate(dateString: any): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(day, month - 1, year); // month is 0-based in JavaScript Date
  }

  editarFactura(factura: Factura, tipo: string) {
    console.log('Editar Factura: ');

    console.log(tipo);
    console.log(factura);

    this.formVirtual = this.fb.group({
      codigoControl: [factura.codigoControlFactura, Validators.required],
      rucEmisor: [factura.rucEmisorFactura, Validators.required],
      razonSocialEmisor: [
        factura.razonSocialEmisorFactura,
        Validators.required,
      ],
      timbradoNro: [factura.timbradoFactura, Validators.required],
      fechaInicioVig: [factura.fechaInicioVigenciaFactura, Validators.required],
      rucReceptor: [factura.rucReceptorFactura, Validators.required],
      razonSocialReceptor: [
        factura.razonSocialReceptorFactura,
        Validators.required,
      ],
      nroFactura: [factura.numeroFactura, Validators.required],
      fechaEmision: [factura.fechaEmisionFactura, Validators.required],
      condicionVenta: [factura.condicionVentaFactura, Validators.required],
      montoTotal: [factura.montoTotalFactura, Validators.required],
      montoIva10: [factura.monto10Factura, Validators.required],
      montoIva5: [factura.monto5Factura, Validators.required],
      montoExenta: [factura.excentaFactura, Validators.required],
      montoTotalIVA: [factura.montoTotalIvaFactura, Validators.required],
      tipoFactura: [factura.tipoFactura, Validators.required],
    });
    console.log(this.formVirtual.value);

    this.factura = factura;
    this.tipoFactura = tipo;
  }

  actualizarFactura(id: number) {
    if (id != null) {
      let factura: Factura = {
        idFactura: id,
        empresa: this.empresa,
        tipoFactura: this.formVirtual.value.tipoFactura.toUpperCase(),
        timbradoFactura: this.formVirtual.value.timbradoNro,
        cdcFactura: null,
        codigoControlFactura:
          this.formVirtual.value.codigoControl.toUpperCase(),
        numeroFactura: this.formVirtual.value.nroFactura,
        rucEmisorFactura: this.formVirtual.value.rucEmisor,
        razonSocialEmisorFactura:
          this.formVirtual.value.razonSocialEmisor.toUpperCase(),
        rucReceptorFactura: this.formVirtual.value.rucReceptor,
        razonSocialReceptorFactura:
          this.formVirtual.value.razonSocialReceptor.toUpperCase(),
        condicionVentaFactura:
          this.formVirtual.value.condicionVenta.toUpperCase(),
        statusFactura: 'ACTIVO'.toUpperCase(),
        fechaInicioVigenciaFactura: this.formVirtual.value.fechaInicioVig,

        fechaFinVigenciaFactura: null,
        fechaEmisionFactura: this.formVirtual.value.fechaEmision,
        montoTotalFactura: this.formVirtual.value.montoTotal,
        montoTotalIvaFactura: this.formVirtual.value.montoTotalIVA,
        monto5Factura: this.formVirtual.value.montoIva5,
        monto10Factura: this.formVirtual.value.montoIva10,
        excentaFactura: this.formVirtual.value.montoExenta,

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

        updatedBy: this.user,
        createdBy: this.user,
      };

      console.log(factura);
      this._facturaService.updatedFactura(factura, id).subscribe((resp) => {
        console.log(resp);
        if (resp.mensaje === 'ACTUALIZADO') {
          this._facturaService.getAllFacturas().subscribe((facturas) => {
            this.facturas = [];
            this.facturasFiltradas = [];
            this.facturas = facturas.objeto;

            this.cargarDatos(this.filtros[0], this.filtros[1], this.filtros[2]);

            this.mensajeFacturas = facturas.mensaje;
            console.log(this.mensajeFacturas, this.facturas);
          });
        } else {
          console.log('Error al actualizar Factura');
        }
      });
    } else {
      console.log('No existe la factura');
    }
  }

  cargarDatos(mes: any, anho: any, cliente: any) {
    this.facturasFiltradas = [];
    console.log(mes, anho, cliente);
    this.filtros = [];
    this.filtros.push(mes, anho, cliente);
    console.log('Los filtros son', this.filtros);

    //Null - Null - Cliente
    if (mes === undefined && anho === undefined && cliente != null) {
      this.filtro =
        'Todos los Periodos del Cliente ' +
        cliente.nombreCliente +
        ': ' +
        cliente.ruc;

      for (let index = 0; index < this.facturas.length; index++) {
        if (this.facturas[index].rucReceptorFactura === cliente.ruc) {
          this.facturasFiltradas.push(this.facturas[index]);
        }
      }
      this.dataSource = new MatTableDataSource(this.facturasFiltradas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    //Null - Año - Cliente
    if (mes === undefined && anho != null && cliente != null) {
      this.filtro =
        'Periodo seleccionado Año: ' +
        anho +
        ' Cliente: ' +
        cliente.nombreCliente +
        ': ' +
        cliente.ruc;
      //Itera en la lista de facturas para encontrar los datos buscados
      for (let index = 0; index < this.facturas.length; index++) {
        //Busca los clientes de la lista
        if (this.facturas[index].rucReceptorFactura === cliente.ruc) {
          let anhoFac = new Date(
            this.facturas[index].fechaEmisionFactura
          ).getFullYear();
          console.log('Años de las facturas...', anhoFac);
          //Busca el año dentro de la fecha de emision de la factura
          if (anhoFac === anho) {
            //carga las coincidencias dentro de este nuevo array...
            this.facturasFiltradas.push(this.facturas[index]);
          }
        }
      }
      this.dataSource = new MatTableDataSource(this.facturasFiltradas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    //Mes - Año - Cliente
    if (mes != null && anho != null && cliente != null) {
      this.filtro =
        'Periodo seleccionado: ' +
        anho +
        ' - ' +
        this.meses[mes - 1].nombre +
        ' del Cliente: ' +
        cliente.nombreCliente +
        ': ' +
        cliente.ruc;
      //Itera en la lista de facturas para encontrar los datos buscados
      for (let index = 0; index < this.facturas.length; index++) {
        //Busca los clientes de la lista
        if (this.facturas[index].rucReceptorFactura === cliente.ruc) {
          let anhoFac = new Date(
            this.facturas[index].fechaEmisionFactura
          ).getFullYear();
          console.log('Años de las facturas...', anhoFac);
          //Busca el año dentro de la fecha de emision de la factura
          if (anhoFac === anho) {
            let mesFac = new Date(
              this.facturas[index].fechaEmisionFactura
            ).getMonth();
            console.log('Meses de las facturas...', mesFac);
            //Busca el mes dentro de la fecha de emision de la factura
            if (mesFac === mes - 1) {
              //carga las coincidencias dentro de este nuevo array...
              this.facturasFiltradas.push(this.facturas[index]);
            }
          }
        }
      }
      this.dataSource = new MatTableDataSource(this.facturasFiltradas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    //Mes - Null - Cliente
    if (mes != null && anho === undefined && cliente != null) {
      this.filtro =
        'Periodo seleccionado Mes: ' +
        this.meses[mes].nombre +
        ' del Cliente: ' +
        cliente.nombreCliente +
        ': ' +
        cliente.ruc;
      //Itera en la lista de facturas para encontrar los datos buscados
      for (let index = 0; index < this.facturas.length; index++) {
        //Busca los clientes de la lista
        if (this.facturas[index].rucReceptorFactura === cliente.ruc) {
          let mesFac = new Date(
            this.facturas[index].fechaEmisionFactura
          ).getMonth();
          console.log('Meses de las facturas...', mesFac);
          //Busca el mes dentro de la fecha de emision de la factura
          if (mesFac === mes - 1) {
            //carga las coincidencias dentro de este nuevo array...
            this.facturasFiltradas.push(this.facturas[index]);
          }
        }
      }
      this.dataSource = new MatTableDataSource(this.facturasFiltradas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    console.log(this.facturasFiltradas);

    this.filtrosAplicados = true;
  }

  editarAprobado(factura: Factura, tipo: string) {
    console.log(factura, tipo);
  }

  // buscarDatosFacturas() {
  //   console.log(
  //     this.formBusqueda.value.textoBuscado,
  //     this.busquedaControl.value
  //   );
  //   this.restaurarBusqueda = true;
  // }

  // restaurarListaFacturas() {
  //   this.formBusqueda = this.fb.group({
  //     textoBuscado: ['', Validators.required],
  //   });
  //   this.busquedaControl = new FormControl('', Validators.required);
  //   this.restaurarBusqueda = false;
  // }

  // clean() {
  //   this.formVirtual.reset();
  // }
}
