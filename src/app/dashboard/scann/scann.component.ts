import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';

import { SafePipe } from '../../shared/pipes/safe.pipe';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import {
  LOAD_WASM,
  NgxScannerQrcodeComponent,
  NgxScannerQrcodeModule,
  NgxScannerQrcodeService,
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';

LOAD_WASM().subscribe((res: any) => {
  console.log('LOAD_WASM', res);
});

import { createWorker } from 'tesseract.js';
import { LoadingComponent } from '../../shared/components/modal/loading/loading.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Factura } from '../../core/model/Factura';
import { FacturaService } from '../../core/services/factura.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/model/User';
import { Rol } from '../../core/model/Rol';
import { FechaPipe } from '../../shared/pipes/fecha.pipe';

@Component({
  selector: 'app-scann',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NgxScannerQrcodeModule,
    SafePipe,
    LoadingComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FechaPipe,
  ],
  templateUrl: './scann.component.html',
  styleUrl: './scann.component.scss',
})
export class ScannComponent implements AfterViewInit, OnInit {
  readonly dialog = inject(MatDialog);

  idUser = 1;
  user: User;

  camposValidos: boolean = true;

  formElectronica: FormGroup;
  formVirtual: FormGroup;
  formFactura: FormGroup;

  cdc = '';
  facturaVirtual = false;
  facturaElectronica = false;
  otrosTiposFacturas = false;
  loading: boolean = false;

  rucEmisor: String = '';
  razonSocialEmisor = '';
  timbradoNro: String = '';
  fechaInicioVig: String = '';
  fechaFinVig: String = '';
  rucReceptor: String = '';
  razonSocialReceptor: String = '';
  nroFactura: String = '';
  fechaEmision: String = '';
  condicionVenta: String = '';
  montoTotal: String = '';
  montoIva10: String = '';
  montoIva5: String = '';
  montoExenta: String = '';
  montoTotalIVA: String = '';
  tipoFactura: String = '';
  codigoControl: String = '';
  tipoDato: String = '';

  scaneoRealizado = false;
  listQr: Array<String> = [];
  facturaVirtualQr: string[] = [];
  pattern: string = '';

  text: String = '';

  file: any;

  esQr: boolean = true;

  config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
    canvasStyles: [
      {
        lineWidth: 1,
        fillStyle: '#00950685',
        strokeStyle: '#00950685',
      },
      {
        font: '17px serif',
        fillStyle: '#ff0000',
        strokeStyle: '#ff0000',
      },
    ],
  };

  qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];
  percentage = 80;
  quality = 100;

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  constructor(
    private qrcode: NgxScannerQrcodeService,
    private fb: FormBuilder,
    private _facturaService: FacturaService,
    private _userService: UserService,
    private fechaPipe: FechaPipe
  ) {
    this.user = {
      idUser: null,
      rol: {
        idRol: 0,
        nombreRol: '',
        statusRol: '',
        createdAt: new Date(),
        createdBy: null,
        updatedAt: new Date(),
        updatedBy: null,
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
        updatedBy: null,
        createdBy: null,
      },
      statusUser: '',
      createdBy: null,
    };
    this.formElectronica = this.fb.group({
      cdc: ['', Validators.required],
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
    this.formFactura = this.fb.group({
      rucEmisor: [this.rucEmisor, Validators.required],
      razonSocialEmisor: [this.razonSocialEmisor, Validators.required],
      timbradoNro: ['', Validators.required],
      fechaInicioVig: ['', Validators.required],
      fechaFinVig: ['', Validators.required],
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
  }

  ngOnInit() {
    this.scaneoRealizado = false;
    this.esQr = false;
    this.formVirtual = new FormGroup({
      codigoControl: new FormControl(''),
      rucEmisor: new FormControl(''),
      razonSocialEmisor: new FormControl(''),
      timbradoNro: new FormControl(''),
      fechaInicioVig: new FormControl(''),
      fechaFinVig: new FormControl(''),
      rucReceptor: new FormControl(''),
      razonSocialReceptor: new FormControl(''),
      nroFactura: new FormControl(''),
      fechaEmision: new FormControl(''),
      condicionVenta: new FormControl(''),
      montoTotal: new FormControl(''),
      montoIva10: new FormControl(''),
      montoIva5: new FormControl(''),
      montoExenta: new FormControl(''),
      montoTotalIVA: new FormControl(''),
      tipoFactura: new FormControl(''),
    });
    this._userService.getUserById(this.idUser).subscribe((user) => {
      this.user = user.objeto;
      console.log('El usuario es: ', this.user);
    });
  }

  ngAfterViewInit(): void {
    // this.action.isReady.subscribe((res: any) => {
    //   this.handle(this.action, 'start');
    // });
  }

  convertirFecha(fecha: string, condicion: string): string {
    return this.fechaPipe.transform(fecha, condicion);
  }

  // openModal() {
  //   this.modalService.open(LoadingComponent);
  // }

  openLoading(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(LoadingComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
    });
  }

  seleccionArchivo(file: any) {
    this.openLoading('1000ms', '1000ms');
    this.file = file;
    this.onSelects(file);
    this.onFileSelected(file);
    this.scaneoRealizado = true;
  }

  onSelects(file: any) {
    this.qrcode
      .loadFiles(file, this.percentage, this.quality)
      .subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        this.qrCodeResult = res;
        console.log(this.qrCodeResult);
        // this.getCodeQr();
      });
  }

  validacionQr(text: string): boolean {
    console.log('Llego aqui...', this.listQr[0]);
    //text = this.listQr[0];
    if (this.listQr.length > 1 || this.isUrlValido(text)) {
      this.esQr = true;
      console.log('Es un QR valido de la SET');
      this.buscarEnQr(text);
      this.dialog.closeAll();
      return true;
    } else if (this.datosQrVirtual(text)) {
      this.facturaVirtual = true;
      console.log('Es un QR valido de Factura Virtual');
      this.formVirtual.get('tipoFactura')!.setValue('Factura Virtual');
      this.formVirtual
        .get('codigoControl')!
        .setValue(this.facturaVirtualQr[0].toUpperCase());
      this.formVirtual.get('timbradoNro')!.setValue(this.facturaVirtualQr[1]);
      this.formVirtual.get('nroFactura')!.setValue(this.facturaVirtualQr[2]);
      this.formVirtual.get('rucEmisor')!.setValue(this.facturaVirtualQr[3]);
      this.formVirtual.get('montoTotal')!.setValue(this.facturaVirtualQr[4]);
      console.log(text);

      return true;
    } else {
      this.listQr = [];
      console.log('No es Valido el QR');
      return false;
    }
  }

  buscarExistenciaFrase(param: string, text: string): boolean {
    return text.toLowerCase().includes(param.toLowerCase());
  }

  buscarEnQr(param: string) {
    this.text = '';
    this.facturaVirtual = false;
    this.otrosTiposFacturas = false;
    this.facturaElectronica = true;
    this.cdc = this.busquedaDatosQr(param, 'Id=', null, null, null, null, '&');
    this.rucReceptor = this.busquedaDatosQr(
      param,
      'dRucRec=',
      null,
      null,
      null,
      null,
      '&'
    );
    this.montoTotal = this.busquedaDatosQr(
      param,
      'dTotGralOpe=',
      null,
      null,
      null,
      null,
      '&'
    );
    this.montoTotalIVA = this.busquedaDatosQr(
      param,
      'dTotIVA=',
      null,
      null,
      null,
      null,
      '&'
    );
  }

  datosQrVirtual(param: string): boolean {
    this.facturaVirtualQr = this.convertStringToArray(param);
    return this.facturaVirtualQr.length === 5;
  }

  convertStringToArray(str: string): string[] {
    return str.split('|');
  }

  busquedaDatosQr(
    text: any,
    key1: string,
    key2: string | null,
    key3: string | null,
    key4: string | null,
    key5: string | null,
    end: string
  ): string {
    console.log('llego aqui a buscar datos qr');

    if (key2 != null && key3 === null && key4 === null && key5 === null) {
      return (
        this.extractData(text, key1, end) || this.extractData(text, key2, end)
      );
    } else if (key2 != null && key3 != null && key4 === null && key5 === null) {
      return (
        this.extractData(text, key1, end) ||
        this.extractData(text, key2, end) ||
        this.extractData(text, key3, end)
      );
    } else if (key2 != null && key3 != null && key4 != null && key5 === null) {
      return (
        this.extractData(text, key1, end) ||
        this.extractData(text, key2, end) ||
        this.extractData(text, key3, end) ||
        this.extractData(text, key4, end)
      );
    } else if (key2 != null && key3 != null && key4 != null && key5 != null) {
      return (
        this.extractData(text, key1, end) ||
        this.extractData(text, key2, end) ||
        this.extractData(text, key3, end) ||
        this.extractData(text, key4, end) ||
        this.extractData(text, key5, end)
      );
    } else {
      return this.extractData(text, key1, end);
    }
  }

  extractData(text: string, ini: string, end: string): string {
    const startIndex = text.indexOf(ini);
    if (startIndex === -1) {
      return '';
    }
    const startDataIndex = startIndex + ini.length;
    const endIndex = text.indexOf(end, startDataIndex);
    if (endIndex === -1) {
      return text.substring(startDataIndex);
    }
    return text.substring(startDataIndex, endIndex);
  }

  isUrlValido(url: string): boolean {
    //expresiones regular
    const regex = /\.(com|net|io|me|crypto|ai|set|gov)\b/i;
    const patron = /^https?:\/\//;
    const patronSET = /^https:\/\/ekuatia\.set\.gov\.py\/.+$/;

    return regex.test(url) && patron.test(url) && patronSET.test(url);
  }

  onEvent(e: ScannerQRCodeResult[], action?: any): void {
    console.log('aqui esta recien scaneando');
    console.log(e);
    this.listQr.push(e[0].value);
    console.log('lista completa de qr: ');
    console.log(this.listQr);
    this.validacionQr(this.listQr[0].toString());
    // this.esQr = this.validacionQr(this.listQr[0]);
  }

  clean() {
    this.esQr = false;
    this.qrCodeResult = [];
    this.listQr = [];
    this.text = '';
    this.scaneoRealizado = false;
    this.facturaElectronica = false;
    this.facturaVirtual = false;
    this.otrosTiposFacturas = false;
  }

  async recognizeText(path: string) {
    const worker = await createWorker('spa', 1, {
      // logger: (m) => console.log(m), // Add logger here
    });
    const {
      data: { text },
    } = await worker.recognize(path);
    console.log(text);
    this.text = text;
    this.facturaVirtual = this.buscarExistenciaFrase('FACTURA VIRTUAL', text);
    if (this.facturaVirtual) {
      if (this.codigoControl === '') {
        this.codigoControl = this.extractCodigoControl(text).toString();
      }
      if (this.nroFactura === '') {
        this.nroFactura = this.extractFacturaNro(text).toString();
      }
      if (this.timbradoNro === '') {
        this.timbradoNro = this.extractTimbradoNro(text).toString();
      }

      this.razonSocialEmisor = '';
      this.pattern = '(\\d+-\\d+)';
      this.rucEmisor = this.extractTextRucVirtual(text, 'RUC ', this.pattern);
      this.rucReceptor = this.extractTextRucVirtual(
        text,
        'IDENTIDAD:',
        this.pattern
      );

      this.razonSocialReceptor = this.extractRazonSocialVirtual(
        text,
        'SOCIAL:',
        'DIRECCION:'
      );
      // this.pattern = '\\d+-\\d+';
      // this.rucEmisor = this.extractText(text, 'RUC', this.pattern);
      this.montoExenta = '';
      this.condicionVenta = '';
      this.extractValueIVA(text);

      this.fechaEmision = this.extractDate(text, 'EMISION:');
      this.fechaInicioVig = this.extractDate(text, 'INICIO DE VIGENCIA');

      this.formVirtual
        .get('razonSocialReceptor')!
        .setValue(this.razonSocialReceptor);
      this.formVirtual.get('rucReceptor')!.setValue(this.rucReceptor);
      this.formVirtual.get('rucEmisor')!.setValue(this.rucEmisor);

      this.formVirtual.get('fechaEmision')!.setValue(this.fechaEmision);
      this.formVirtual.get('fechaInicioVig')!.setValue(this.fechaInicioVig);

      // this.fechaFinVig = this.extractDate(text, 'FIN DE VIGENCIA');
    } else {
    }
    this.dialog.closeAll();
    await worker.terminate();
  }

  onFileSelected(files: any) {
    console.log(event);

    const file: File = files[0];
    if (file) {
      const url: string = URL.createObjectURL(file);
      this.recognizeText(url);
    }
  }

  searchInArray(arr: string[]): string | null {
    this.tipoDato = 'rucEmisor';
    while ((this.tipoDato = 'montoTotalIVA')) {
      switch (this.tipoDato) {
        case 'rucEmisor':
          for (let str of arr) {
            if (str.toLowerCase().includes('RUC: '.toLowerCase())) {
              this.rucEmisor = str;
              this.tipoDato = 'timbradoNro';
              break;
            }
          }
          break;
        case 'timbradoNro':
          for (let str of arr) {
            if (str.toLowerCase().includes('Timbrado N°: '.toLowerCase())) {
              this.rucEmisor = str;
              this.tipoDato = 'fechaInicioVig';
              break;
            }
          }
          break;
        case 'fechaInicioVig':
          for (let str of arr) {
            if (
              str
                .toLowerCase()
                .includes('Fecha Inicio Vigencia: '.toLowerCase())
            ) {
              this.rucEmisor = str;
              this.tipoDato = 'fechaFinVig';
              break;
            }
          }
          break;
        case 'fechaFinVig':
          for (let str of arr) {
            if (
              str.toLowerCase().includes('Fecha Fin Vigencia: '.toLowerCase())
            ) {
              this.rucEmisor = str;
              this.tipoDato = 'rucReceptor';
              break;
            }
          }
          break;
        case 'rucReceptor':
          for (let str of arr) {
            if (str.toLowerCase().includes('Ruc / CI: '.toLowerCase())) {
              this.rucEmisor = str;
              // this.tipoDato = "razonSocialReceptor";
              this.tipoDato = 'nroFactura';
              break;
            }
          }
          break;
        // case "razonSocialReceptor":
        //   for (let str of arr) {
        //     if (str.toLowerCase().includes("Razon Social: ".toLowerCase())) {
        //       this.rucEmisor = str;
        //       this.tipoDato = "nroFactura";
        //       break;
        //     }
        //   }
        //   break;
        case 'nroFactura':
          for (let str of arr) {
            if (str.toLowerCase().includes('N°'.toLowerCase())) {
              this.rucEmisor = str;
              this.tipoDato = 'fechaEmision';
              break;
            }
          }
          break;
        case 'fechaEmision':
          for (let str of arr) {
            if (
              str.toLowerCase().includes('Fecha de Emision: '.toLowerCase())
            ) {
              this.rucEmisor = str;
              // this.tipoDato = "condicionVenta";
              this.tipoDato = 'montoTotal';
              break;
            }
          }
          break;
        // case "condicionVenta":
        //   for (let str of arr) {
        //     if (str.toLowerCase().includes("Ruc / CI: ".toLowerCase())) {
        //       this.rucEmisor = str;
        //       this.tipoDato = "montoTotal";
        //       break;
        //     }
        //   }
        //   break;
        case 'montoTotal':
          for (let str of arr) {
            if (str.toLowerCase().includes('Total '.toLowerCase())) {
              this.rucEmisor = str;
              this.tipoDato = 'montoIva10';
              break;
            }
          }
          break;
        case 'montoIva10':
          for (let str of arr) {
            if (str.toLowerCase().includes('10% '.toLowerCase())) {
              this.rucEmisor = str;
              this.tipoDato = 'montoIva5';
              break;
            }
          }
          break;
        case 'montoIva5':
          for (let str of arr) {
            if (str.toLowerCase().includes('5% '.toLowerCase())) {
              this.rucEmisor = str;
              // this.tipoDato = "montoExenta";
              this.tipoDato = 'montoTotalIVA';
              break;
            }
          }
          break;
        // case "montoExenta":
        //   for (let str of arr) {
        //     if (str.toLowerCase().includes(" ".toLowerCase())) {
        //       this.rucEmisor = str;
        //       this.tipoDato = "montoTotalIVA";
        //       break;
        //     }
        //   }
        //   break;
        default:
          break;
      }
    }

    // for (let str of arr) {
    //     if (str.includes(searchStr)) {
    //         return str;
    //     }
    // }
    return null;
  }

  extractTimbradoNro(text: string): string {
    // Crear una expresión regular dinámica basada en la palabra clave
    const regex = /TIMBRADO\s+N[°*]\s+(\d{8})/i;
    const match = text.match(regex);
    if (match) {
      return match[1];
    }
    return '';
  }

  extractFacturaNro(text: string): string {
    // Crear una expresión regular dinámica basada en la palabra clave
    const regex = /VIRTUAL\s+(\d{3}\s*-\s*\d{3}\s*-\s*\d{7})/i;
    const match = text.match(regex);

    if (match) {
      // Eliminar cualquier espacio alrededor de los guiones
      return match[1].replace(/\s+/g, '');
    }
    return '';
  }

  extractCodigoControl(text: string): string {
    // Crear una expresión regular dinámica basada en la palabra clave
    const regex = /CONTROL\s+([A-Za-z0-9]{8})/i;
    const match = text.match(regex);

    if (match) {
      return match[1];
    }
    return '';
  }

  extractTextRucVirtual(text: string, search: string, pattern: string): string {
    const regex = new RegExp(`${search}\\s*${pattern}`);
    const match = text.match(regex);
    // console.log('El texto que llego es: ', text);

    return match ? match[1] : '';
  }

  extractRazonSocialVirtual(
    fullText: string,
    startKeyword: string,
    endKeyword: string
  ): string {
    // Crear una expresión regular dinámica basada en las palabras clave
    const regexPattern = new RegExp(
      `${startKeyword}\\s*(.*?)\\s*${endKeyword}`,
      's'
    );
    const match = fullText.match(regexPattern);
    if (match) {
      const extractedText = match[1].trim();
      return extractedText.split(/\s+/).toString(); // Separar el texto por espacios
    }
    return '';
  }

  extractValueIVA(text: string) {
    this.montoExenta = '';
    this.montoIva10 = '';
    this.montoIva5 = '';
    this.montoTotalIVA = '';
    const regex5 = /\(5%\)\s*([\d.]+)/;
    const match5 = text.match(regex5) ? null : '-1';
    const regex10 = /\(10%\)\s*([\d.]+)/;
    const match10 = text.match(regex10) ? null : '-1';
    console.log(match5);
    console.log(match10);

    if (match5 && match5.length > 1 && match10 && match10.length > 1) {
      if (match10[1] === '0' && match5[1] === '0') {
        console.log('El total es Excento de IVA');
        this.montoTotalIVA = '0';
        this.montoExenta = '0';
        this.montoIva5 = '0';
        this.montoIva10 = '0';
      }
      if (Number(match10[1]) > 0 && match5[1] === '0') {
        console.log('El monto es IVA 10% y el 5% es 0');
      }
      if (Number(match5[1]) > 0 && match10[1] === '0') {
        console.log('El monto es IVA 5% y el 10% es 0');
      }
      if (Number(match10[1]) > 0 && Number(match5[1]) > 0) {
        console.log('El monto es IVA 5% y 10%');
      }
      if (match10 === null && match5[1] === '0') {
        console.log('El IVA en su totalidad es 10%');
      }
      if (match5 === null && match10[1] === '0') {
        console.log('El IVA en su totalidad es 5%');
      }
    }

    // if (match10 === '-1' && match5 === '-1') {
    //   if (match5 && match5.length > 1 && match10 && match10.length > 1) {
    //     if (match5[1] === '0') {
    //       if (match10[1] === '0') {
    //         console.log('El total es Excento de IVA');
    //         this.montoTotalIVA = '0';
    //         this.montoExenta = '0';
    //         this.montoIva5 = '0';
    //         this.montoIva10 = '0';
    //       } else {
    //         this.montoIva10 = match10[1];
    //         this.montoTotal = (
    //           Number(this.montoTotal) + Number(this.montoIva10)
    //         ).toString();
    //         //this.montoIva10 = ((Number(this.montoTotal) * 11) / 100).toString();
    //         console.log('El total es con IVA 10%');
    //       }
    //     } else {
    //       if (match10[1] === '0') {
    //         console.log('El total es con iva 5%');
    //       } else {
    //         console.log('El total es con IVA 5% y 10%');
    //       }
    //     }
    //   }
    // } else {
    //   console.log('El total es Excento de IVA');
    //   this.montoTotalIVA = '0';
    //   this.montoIva10 = '0';
    //   this.montoIva5 = '0';
    //   this.montoExenta = '0';
    // }
  }

  extractValue10(text: string): string {
    const regex = /\(10%\)\s*([\d.]+)/;
    const match = text.match(regex);
    console.log(match);

    if (match && match.length > 1) {
      return match[1]; // El primer grupo capturado es el valor numérico
    } else {
      return 'Existe';
    }
  }

  extractDataVirtual(
    fullText: string,
    prefix: string,
    limitChar: string
  ): string {
    const regexPattern = `${prefix}(.*?)${limitChar}`;
    const regex = new RegExp(regexPattern);
    const match = fullText.match(regex);
    return match ? match[1].trim() : '';
  }

  extractDate(fullText: string, keyword: string): string {
    // Crear una expresión regular dinámica basada en la palabra clave
    const regexPattern = new RegExp(
      `${keyword}\\s*[:\-]?\s*(\\d{1,2}[-\/.]\\d{1,2}[-\/.]\\d{2,4}|\\d{4}[-\/.]\\d{1,2}[-\/.]\\d{1,2})`,
      'i'
    );
    const match = fullText.match(regexPattern);
    return match ? match[1].trim() : '';
  }

  // Método para probar la extracción
  testExtraction() {
    const text = 'RAZON SOCIAL: JUANITO SA, OTRA INFORMACION';
    const prefix = 'RAZON SOCIAL:';
    const limitChar = ',';
    const extractedData = this.extractDataVirtual(text, prefix, limitChar);
    console.log(extractedData); // Debería imprimir "JUANITO SA"
  }

  guardarFactura() {
    console.log(this.formVirtual.value);

    let factura: Factura = {
      idFactura: null,

      tipoFactura: this.formVirtual.value.tipoFactura,
      timbradoFactura: this.formVirtual.value.timbradoNro,
      cdcFactura: null,
      codigoControlFactura: this.formVirtual.value.codigoControl,
      numeroFactura: this.formVirtual.value.nroFactura,
      rucEmisorFactura: this.formVirtual.value.rucEmisor,
      razonSocialEmisorFactura: this.formVirtual.value.razonSocialEmisor,
      rucReceptorFactura: this.formVirtual.value.rucReceptor,
      razonSocialReceptorFactura: this.formVirtual.value.razonSocialReceptor,
      condicionVentaFactura: this.formVirtual.value.condicionVenta,
      statusFactura: 'ACTIVO',
      fechaInicioVigenciaFactura: this.convertirFecha(
        this.formVirtual.value.fechaInicioVig,
        "yyyy-MM-dd'T'HH:mm:ss.SSS"
      ),
      fechaFinVigenciaFactura: null,
      fechaEmisionFactura: this.convertirFecha(
        this.formVirtual.value.fechaEmision,
        "yyyy-MM-dd'T'HH:mm:ss.SSS"
      ),

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

    console.log('La factura...', factura);

    this._facturaService.setFactura(factura).subscribe((resp) => {
      console.log('La factura guardada...', resp);
      console.log('Factura guardada con exito...!!!');
    });
  }
}
