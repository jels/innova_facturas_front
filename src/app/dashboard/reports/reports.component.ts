import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Cliente } from '../../core/model/Cliente';
import { Empresa } from '../../core/model/Empresa';
import { Factura } from '../../core/model/Factura';
import { FormularioRG90 } from '../../core/model/FormularioRG90';
import { ListRg90Desglosado } from '../../core/model/ListRg90Desglosado';
import { RgFactura } from '../../core/model/RgFactura';
import { User } from '../../core/model/User';
import { ClienteService } from '../../core/services/cliente.service';
import { CsvService } from '../../core/services/csv.service';
import { EmpresaService } from '../../core/services/empresa.service';
import { RgfacturaService } from '../../core/services/rgfactura.service';
import { UserService } from '../../core/services/user.service';
import { ZipService } from '../../core/services/zip.service';
import { FormatogsPipe } from '../../shared/pipes/formatogs.pipe';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    MatTooltipModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    FormatogsPipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  rg90 = true;
  textoCabeceraModalListaFacturas = '';
  idCliente = 0;
  idUser = 1;
  user!: User;
  clientes: Cliente[] = [];
  rgFacturas: RgFactura[] = [];
  listrg90: RgFactura[] = [];
  listRg90Desglosado: ListRg90Desglosado;

  cliente!: Cliente;
  mensaje: string = '';
  formCliente: FormGroup;
  empresa!: Empresa;
  rgFactura!: RgFactura;
  formularioRg90!: FormularioRG90;
  facturasRq90: FormularioRG90[] = [];
  displayedColumns: string[] = [
    'id',
    'ruc',
    'razonsocial',
    'anho',
    'mes',
    'generado',
    'acciones',
  ];
  displayedColumnsFacturas: string[] = [
    'id',
    'codigoRegistro',
    'tipoComprador',
    'rucComprador',
    'nombreComprador',
    'tipoComprobante',
    'timbrado',
    'nroComprobante',
    'montoIva5',
    'montoIva10',
    'montoExenta',
    'montoTotal',
    'condicionVenta',
    'monedaExtranjera',
    'imputaIva',
    'imputaIre',
    'imputaIrpRsp',
    'compAsociado',
    'timbradoCompAsociado',
  ];

  dataSource: MatTableDataSource<any>;
  dataSourceSeleccionado: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _clienteService: ClienteService,
    private fb: FormBuilder,
    private _userService: UserService,
    private _empresaService: EmpresaService,
    private _rgfacturaService: RgfacturaService,
    private csvService: CsvService,
    private zipService: ZipService
  ) {
    this.dataSource = new MatTableDataSource();
    this.dataSourceSeleccionado = new MatTableDataSource();

    this.listRg90Desglosado = {
      ruc: '',
      razonSocial: '',
      anho: '',
      mes: '',
      estadoRg90: '',
      rgFactura: [],
    };

    this.formCliente = this.fb.group({
      nombreCliente: ['', Validators.required],
      rucCliente: ['', Validators.required],
      dvRucCliente: ['', Validators.required],
      direccionCliente: ['', Validators.required],
      telefonoCliente: ['', Validators.required],
      correoCliente: ['', Validators.required],
      fechaCierreCliente: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._userService.getUserById(this.idUser).subscribe((user) => {
      this.user = user.objeto;
      this._empresaService
        .getEmpresa(this.user.idEmpresa)
        .subscribe((empresa) => {
          this.empresa = empresa.objeto;
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
    });

    this._rgfacturaService.showAllORderASC().subscribe((rgFacturas) => {
      if (rgFacturas.mensaje == 'No hay registros') {
        this.mensaje = rgFacturas.mensaje;
        this.rgFacturas = [];
      } else {
        this.rgFacturas = rgFacturas.objeto;
        this.mensaje = rgFacturas.mensaje;
      }
    });

    this._rgfacturaService.listRg90().subscribe((rgFacturas) => {
      if (rgFacturas.mensaje == 'No hay registros') {
        this.mensaje = rgFacturas.mensaje;
        this.listrg90 = [];
      } else {
        this.listrg90 = rgFacturas.objeto;
        this.mensaje = rgFacturas.mensaje;
      }
      this.dataSource = new MatTableDataSource(this.listrg90);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  listarFacturas(factura: RgFactura) {
    const temp: RgFactura[] = [];
    for (let index = 0; index < this.rgFacturas.length; index++) {
      console.log(this.rgFacturas[index].anhoPeriodo === factura.anhoPeriodo);

      if (
        this.rgFacturas[index].anhoPeriodo === factura.anhoPeriodo &&
        this.rgFacturas[index].mesPeriodo === factura.mesPeriodo &&
        this.rgFacturas[index].ruc === factura.ruc
      ) {
        temp.push(this.rgFacturas[index]);
      }
    }

    this.listRg90Desglosado.mes = factura.mesPeriodo;
    this.listRg90Desglosado.anho = factura.anhoPeriodo;
    this.listRg90Desglosado.ruc = factura.ruc;
    this.listRg90Desglosado.razonSocial = factura.razonSocial;
    this.listRg90Desglosado.estadoRg90 = 'GENERADO';
    this.listRg90Desglosado.rgFactura = temp;

    this.dataSourceSeleccionado = new MatTableDataSource(
      this.listRg90Desglosado.rgFactura
    );
    this.dataSourceSeleccionado.paginator = this.paginator;
    this.dataSourceSeleccionado.sort = this.sort;

    this.textoCabeceraModalListaFacturas =
      'Ruc: ' +
      factura.ruc +
      ' Periodo: ' +
      factura.mesPeriodo +
      '/' +
      factura.anhoPeriodo +
      ' fue seleccionado';
    console.log('Recibe la factura_', this.listRg90Desglosado);
  }

  editarAprobado(factura: Factura, tipo: string) {
    console.log(factura);
  }

  filtradoRg90() {
    console.log('Lista Agrupada', this.listrg90);
    console.log('Lista de RgFacturas', this.rgFacturas);
  }

  restaurarFiltos() {
    this.ngOnInit();
  }
}
