import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Estudiante} from '../../../models/estudiante.model';
import {Apoderado} from '../../../models/apoderado.model';
import {CHECK_INPUT, roundTo} from '../../../../../utils/general.utils';
import {Seguro} from '../../../models/seguro.model';
import {GrupoSanguineo} from '../../../models/grupoSanguineo.model';
import {CheckoutService} from '../../../services/checkout.service';
import {Router} from '@angular/router';
import {Departamento} from '../../../models/departamento.model';
import {Provincia} from '../../../models/provincia.model';
import {Distrito} from '../../../models/distrito.model';
import {DatePipe} from '@angular/common';
import { TransaccionService } from '../../../services/transaccion.service';
import { Sesion } from '../../../models/sesion.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalNiubizComponent } from '../../../fragments/modal-niubiz/modal-niubiz.component';
import {CarritoService} from '../../../../../services/carrito.service';
import {Seccion} from '../../../../catalogo/models/seccion.model';
import {Carrito} from '../../../../../models/carrito.model';
import {Matricula} from '../../../models/matricula.model';
import {MatriculaDetalle} from '../../../models/matriculaDetalle.model';
import { environment } from 'src/environments/environment';
import {Operacion} from '../../../models/operacion.model';
import {Autorizacion} from '../../../models/autorizacion.model';
import {Orden} from '../../../models/orden.model';
import Swal from 'sweetalert2';
import {Antifraud} from '../../../models/antifraud.model';
import {MerchantDefineData} from '../../../models/merchantDefineData.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  activacion: boolean;
  autocompleteDNI: any;
  autocomplete: any;
  isSubmited: boolean;
  isAdult: boolean;

  formEstudiante: FormGroup;
  formApoderado: FormGroup;

  estudiante?: Estudiante;
  apoderado?: Apoderado;
  seguro?: Seguro;
  sanguineo?: GrupoSanguineo;

  grupoSanguineos: GrupoSanguineo[];
  seguros: Seguro[];
  departamentos: Departamento[];
  provincias: Provincia[];
  distritos: Distrito[];
  departamentosApo: Departamento[];
  provinciasApo: Provincia[];
  distritosApo: Distrito[];
  distritosDomicilio: Distrito[];

  secciones: Seccion[];
  total: number;
  matricula: Matricula;
  pre_pago = false;
  dataRegister: any = {};
  closeResult = '';
  clienteIp = '';
  fechaOperacion: any;
  validarMostrarAlertaMensajeError: boolean;

  constructor(private fb: FormBuilder, private checkoutService: CheckoutService, private transaccionService: TransaccionService,  private router: Router, private modalService: NgbModal, private datePipe: DatePipe, private carritoService: CarritoService) {

    this.formEstudiante = new FormGroup({});
    this.formApoderado = new FormGroup({});


    this.isSubmited = false;
    this.isAdult = true;
    this.autocompleteDNI = true;
    this.autocomplete = true;
    this.activacion = false;
    this.grupoSanguineos = [];
    this.seguros = [];
    this.departamentos = [];
    this.provincias = [];
    this.distritos = [];
    this.departamentosApo = [];
    this.provinciasApo = [];
    this.distritosApo = [];
    this.distritosDomicilio = [];
    this.total = 0;
    this.pre_pago = true;
    this.fechaOperacion = this.formatDate(new Date());
    this.validarMostrarAlertaMensajeError = false;
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  ngOnInit(): void {
    this.secciones = this.carritoService.getCarrito()?.secciones;
    let t = this;
    t.total = 0;
    this.secciones.forEach(sec => {
      t.total += sec.precio;
    });
    this.total = this.parseNumber(t.total);

    this.formEstudiante = this.fb.group({
      numero_carnet: [''],
      nombres: ['', Validators.required],
      ape_paterno: ['', Validators.required],
      ape_materno: ['', Validators.required],
      sexo: ['Hombre', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      direccion: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      distrito_de_domicilio: ['150137', Validators.required],
      telefono: '',
      movil: ['', [Validators.required, Validators.minLength(9)]],
      correo: ['', [Validators.required, Validators.email]],
      correo_confirmacion: ['', [Validators.required, Validators.email]],
      seguro: ['', Validators.required],
      enfermedades: [''],
      medicinas: [''],
      sanguineo: [''],
      departamento: [''],
      provincia: [''],
      distrito: ['']
    }, { validator: this.compararCorreos });

    this.formEstudiante.valueChanges.subscribe(data => {
      this.validarMostrarAlertaMensajeError = this.formEstudiante.invalid;
    });

    this.formApoderado = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8)]],
      nombres: ['', [Validators.required]],
      ape_paterno: ['', [Validators.required]],
      ape_materno: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      distrito_de_domicilio: ['150137', [Validators.required]],
      telefono: [''],
      movil: ['', [Validators.required, Validators.minLength(9)]],
      correo: ['', [Validators.required, Validators.email]],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]]
    });


    this.formApoderado.valueChanges.subscribe(data => {
      this.validarMostrarAlertaMensajeError = this.formApoderado.invalid;
    });



    this.getSanguineos();
    this.getSeguros();
    this.getDepartamentos();
    this.mostrarDistritosDomicilio('1501');


    this.checkoutService.consultarIP().subscribe(data => {
      this.clienteIp = JSON.parse(JSON.stringify(data)).ip;
    });

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  compararCorreos(controls: any) {
    let field = controls['value'];
    return field.correo === field.correo_confirmacion ? null : controls.controls['correo_confirmacion'].setErrors({ correoNotEquivalent: true });
  }

  validarEdad(value: string): void{
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age = age - 1; }
    this.isAdult = (age >= 18) ? true : false;
  }

  buscarEstudiantePorDni(cod: string): void{
    if (cod.length == 8) {
      this.checkoutService.buscarEstudiantePorDni(cod).subscribe(data => {
        if (data != undefined){
          this.estudiante = data;
          this.validarEdad(this.estudiante.fecha_nacimiento);

          if(this.estudiante?.departamento != null && this.estudiante?.departamento != '') this.mostrarProvincias(this.estudiante.departamento);
          if(this.estudiante?.provincia != null && this.estudiante?.provincia != '') this.mostrarDistritos(this.estudiante.provincia);

          console.log('this.estudiante', this.estudiante);
          console.log('this.estudiante?.seguro?.id', this.estudiante?.seguro?.id);
          this.formEstudiante.patchValue(this.estudiante);
          this.formEstudiante.patchValue({
            seguro: (this.estudiante?.seguro?.id != null) ? this.estudiante.seguro.id: '',
            sanguineo: (this.estudiante?.sanguineo?.id != null) ? this.estudiante.sanguineo.id: '',
            fecha_nacimiento: this.datePipe.transform(this.estudiante.fecha_nacimiento, 'yyyy-MM-dd')
          });
        }
      });
    }
  }

  buscarApoderadoPorDni(cod: string) {
    if (cod.length == 8) {
      this.checkoutService.buscarApoderadoPorDni(cod).subscribe(data => {
        if (data != undefined) {
          this.apoderado = data;

          this.mostrarProvinciasApo(this.apoderado.departamento);
          this.mostrarDistritosApo(this.apoderado.provincia);

          this.formApoderado.patchValue(this.apoderado);
          this.formApoderado.patchValue({
            fecha_nacimiento: this.datePipe.transform(this.apoderado?.fecha_nacimiento, 'yyyy-MM-dd')
          });
        }
      });
    }
  }

  getSanguineos(): void{
    this.checkoutService.getSanguineos().subscribe(data => {
      this.grupoSanguineos = data;
    });
  }
  getSeguros(): void{
    this.checkoutService.getSeguros().subscribe(data => {
      this.seguros = data;
    });
  }

  getDepartamentos(): void{
    this.checkoutService.getDepartamentos().subscribe(data => {
      this.departamentos = data;
      this.departamentosApo = data;
    });
  }
  mostrarProvincias(cod: string): void{
    this.checkoutService.getProvincias(cod).subscribe(data => {
      this.provincias = data;
      this.distritos = [];
    });
  }
  mostrarDistritos(cod: string): void{
    this.checkoutService.getDistritos(cod).subscribe(data => {
      this.distritos = data;
    });
  }
  mostrarProvinciasApo(cod: string): void{
    this.checkoutService.getProvincias(cod).subscribe(data => {
      this.provinciasApo = data;
      this.distritosApo = [];
    });
  }
  mostrarDistritosApo(cod: string): void{
    this.checkoutService.getDistritos(cod).subscribe(data => {
      this.distritosApo = data;
    });
  }

  mostrarDistritosDomicilio(cod: string): void{
    this.checkoutService.getDistritos(cod).subscribe(data => {
      this.distritosDomicilio = data;
    });
  }

  guardar(): void{
    this.isSubmited = true;



    const _estudiante = new Estudiante();
    _estudiante.numero_carnet = this.formEstudiante.value.numero_carnet;
    _estudiante.nombres = this.formEstudiante.value.nombres;
    _estudiante.ape_paterno = this.formEstudiante.value.ape_paterno;
    _estudiante.ape_materno = this.formEstudiante.value.ape_materno;
    _estudiante.sexo = this.formEstudiante.value.sexo;
    _estudiante.dni = this.formEstudiante.value.dni;
    _estudiante.direccion = this.formEstudiante.value.direccion;
    _estudiante.fecha_nacimiento = this.formEstudiante.value.fecha_nacimiento;
    _estudiante.distrito_de_domicilio = this.formEstudiante.value.distrito_de_domicilio;
    if(this.formEstudiante.value.telefono != null && this.formEstudiante.value.telefono.length > 0) _estudiante.telefono = this.formEstudiante.value.telefono;
    _estudiante.movil = this.formEstudiante.value.movil;
    _estudiante.correo = this.formEstudiante.value.correo;
    if(this.formEstudiante.value.seguro != null && String(this.formEstudiante.value.seguro).length > 0){
      const _seguro = new Seguro();
      _seguro.id = this.formEstudiante.value.seguro;
      _estudiante.seguro = _seguro;
    }


    if(this.formEstudiante.value.enfermedades != null && this.formEstudiante.value.enfermedades.length > 0) _estudiante.enfermedades = this.formEstudiante.value.enfermedades;
    if(this.formEstudiante.value.medicinas != null && this.formEstudiante.value.medicinas.length > 0) _estudiante.medicinas = this.formEstudiante.value.medicinas;
    if(this.formEstudiante.value.sanguineo != null && String(this.formEstudiante.value.sanguineo).length > 0) {
      const _sanguineo = new GrupoSanguineo();
      _sanguineo.id = this.formEstudiante.value.sanguineo;
      _estudiante.sanguineo = _sanguineo;
    }

    if(this.formEstudiante.value.departamento != null && String(this.formEstudiante.value.departamento).length > 0) _estudiante.departamento = this.formEstudiante.value.departamento;
    if(this.formEstudiante.value.provincia != null && String(this.formEstudiante.value.provincia).length > 0) _estudiante.provincia = this.formEstudiante.value.provincia;
    if(this.formEstudiante.value.distrito != null && String(this.formEstudiante.value.distrito).length > 0) _estudiante.distrito = this.formEstudiante.value.distrito;
    this.estudiante = _estudiante;

    const _apoderado = new Apoderado();
    _apoderado.dni = this.formApoderado.value.dni;
    _apoderado.nombres = this.formApoderado.value.nombres;
    _apoderado.ape_paterno = this.formApoderado.value.ape_paterno;
    _apoderado.ape_materno = this.formApoderado.value.ape_materno;
    _apoderado.fecha_nacimiento = this.formApoderado.value.fecha_nacimiento;
    _apoderado.direccion = this.formApoderado.value.direccion;
    _apoderado.distrito_de_domicilio = this.formApoderado.value.distrito_de_domicilio;
    if(this.formApoderado.value.telefono != null && String(this.formEstudiante.value.telefono).length > 0) _apoderado.telefono = this.formApoderado.value.telefono;
    _apoderado.movil = this.formApoderado.value.movil;
    _apoderado.correo = this.formApoderado.value.correo;
    _apoderado.departamento = this.formApoderado.value.departamento;
    _apoderado.provincia = this.formApoderado.value.provincia;
    _apoderado.distrito = this.formApoderado.value.distrito;

    this.apoderado = _apoderado;


    this.validarMostrarAlertaMensajeError = true;
    if (this.formEstudiante.invalid ) return;
    if(!this.isAdult) {
      if(this.formApoderado.invalid) return;
    }
    this.validarMostrarAlertaMensajeError = false;

    this.servicioGuardar();
  }

  servicioGuardar(): void {

    let merchantDefineData: MerchantDefineData = new MerchantDefineData();
    merchantDefineData.MDD4 = this.estudiante?.correo;
    merchantDefineData.MDD21 = 0;
    merchantDefineData.MDD31 = this.estudiante?.movil;
    merchantDefineData.MDD32 = this.estudiante?.correo;
    //merchantDefineData.MDD33 = 'DNI';
    //merchantDefineData.MDD34 = this.estudiante?.dni;
    merchantDefineData.MDD40 = this.secciones.length;
    merchantDefineData.MDD75 = 'Invitado';
    merchantDefineData.MDD77 = '0';

    let antifraud: Antifraud = new Antifraud();
    antifraud.clientIp = this.clienteIp;
    antifraud.merchantDefineData = merchantDefineData;

    let sesion: Sesion = new Sesion();
    sesion.amount = this.total;
    sesion.channel = 'web';
    sesion.antifraud = antifraud;
    /*
    "antifraud":{
      "clientIp":"192.168.1.196",    // Dirección IP del cliente
      "merchantDefineData":{
         "MDD4":"email@email.com",  // Email del cliente
         "MDD32":"JD189
         *
         *
    * */



    this.transaccionService.getSecurity().subscribe(token => {
      this.transaccionService.getSession(sesion, token).subscribe(ses => {
        sesion.merchantId = `${environment.API_NIUBIZ_IDCOMERCIO}`;
        sesion.cardholdername = (this.isAdult) ? this.formEstudiante.value.nombres : this.formApoderado.value.nombres;
        sesion.cardholderlastname = (this.isAdult) ? this.formEstudiante.value.ape_paterno + ' ' + this.formEstudiante.value.ape_materno : this.formApoderado.value.ape_paterno + ' ' + this.formApoderado.value.ape_materno;
        sesion.cardholderemail = (this.isAdult) ? this.formEstudiante.value.correo : this.formApoderado.value.correo;
        sesion.timeouturl = 'http://172.16.36.248/'+ses.id;
        sesion.purchaseNumber = (new Date().getTime()).toString().substr(0, 12);
        sesion.tokenSesion = token;
        sesion = Object.assign(sesion, ses);

        console.log('SESION => ', sesion);
        this.modalNiubiz(sesion);

      });
    });

  }


  consultarOperacion(transaccionToken: string, data: Sesion): void{
    Swal.fire('Procesando...');
    Swal.showLoading();



    const operacion = new Operacion();
    const order = new Orden();
    order.amount = this.total;
    order.currency = 'PEN';
    order.tokenId = transaccionToken;
    order.purchaseNumber = data.purchaseNumber;//(data.purchaseNumber != null && data.purchaseNumber.length > 0) ? data.purchaseNumber : (new Date().getTime()).toString().substr(0, 12);

    const autorizacion = new Autorizacion();
    autorizacion.antifraud = null;
    autorizacion.captureType = 'manual';
    autorizacion.channel = 'web';
    autorizacion.countable = true;
    autorizacion.order = order;
    autorizacion.transactionToken = data.tokenSesion;
    autorizacion.recurrence = null;
    autorizacion.sponsored = null;

    operacion.autorizacion = autorizacion;
    operacion.estudiante = this.estudiante;
    if(!this.isAdult) operacion.apoderado = this.apoderado;
    operacion.secciones = this.secciones;
    const t = this;

    this.checkoutService.consultarTransaccion(operacion).subscribe(data => {
      t.dataRegister = data;

      if(t.dataRegister.code == 200 ){
        if(typeof t.dataRegister.data.matricula !== 'undefined'){
          Swal.close();
          this.router.navigate(['/pasarela/voucher/' + t.dataRegister.data?.matricula?.id + '/' + t.dataRegister.data?.estudiante?.dni]);
        }
        else {
          const obj = JSON.parse(t.dataRegister.data);
          //Swal.fire('¡Ups! Ocurrio un error', 'Lo sentimos, la operación de la transacción fue rechazada.<br/><br/><h5>Detalles de la transacción</h5><ul><li>Número de pedido: ' + operacion.autorizacion.order.purchaseNumber + '</li><li>Fecha:' + this.fechaOperacion + '</li><li>Codigo de acción:' + obj.data.ACTION_CODE + '</li><li>Descripción de la denegación:' + obj.data.ACTION_DESCRIPTION + '</li></ul>', 'error');
          Swal.fire('', '<h5>¡Hola! Parece que hay un error en tu matrícula. Puede ser por los siguientes motivos:</h5>' +
            '<div style="font-size: 14px;text-align: left;margin-top: 15px;"><ul>' +
            '<li>- Transacción bloqueada por múltiples intentos de pagos fallidos.</li>' +
            '<li>- La clave secreta (CVV) no corresponde a tu tarjeta.</li>' +
            '<li>- No se pudo procesar el pago debido al saldo insuficiente de tu tarjeta.</li>' +
            '<li>- Tu tarjeta no tiene habilitada la opción de realizar pagos por internet.</li>' +
            '<li>- No se pudo completar la transacción porque la tarjeta está vencida.</li>' +
            '<li>- Tarjeta/Cuenta inhabilitada o no apta.</li>' +
            '<li>- La tarjeta fue reportada como riesgosa.</li>' +
            '<li>- Se rechaza el pago debido a inconvenientes con su banco.</li>' +
            '</ul>' +
            '<p style="margin-top: 15px; text-align: center">No te preocupes, que no se realizó la transacción ni el pago.</p>' +
            '<p style="margin-top: 5px; text-align: center;">De salirte este mensaje, te recomendamos aproximarte a la Plataforma de Atención del Ciudadano de la Municipalidad Distrital de Lima para <strong>de manera excepcional</strong>, realices tu matrícula presencial.</p>' +
            '<p style="margin-top: 5px; text-align: center;">Muchas gracias por tu atención. ¡Los esperamos!</p></div>', 'error');
        }
      } else Swal.fire('¡Ups! Ocurrio un error en el sistema', 'Por favor intentelo nuevamente o realice una llamada al centro de atencion.', 'error');

    });
  }

  modalNiubiz(data: Sesion) {

    console.log(data);
    const modalRef: NgbModalRef = this.modalService.open(ModalNiubizComponent, {backdrop: 'static', size: 'md', keyboard: false, centered: true});
    modalRef.componentInstance.data = data;

    modalRef.result.then(
      (transactionToken) => {
        if (transactionToken.length > 10) this.consultarOperacion(transactionToken, data);
      }, (error) => {
        console.log('ERROR');
      });
  }

  parseNumber(num: number){
    return roundTo(num, 2);
  }

  checkInput(input: string, type: string, errorType: string = ''): boolean {
    return CHECK_INPUT(this.formEstudiante, input , type, errorType, this.isSubmited);
  }

  checkInputApoderado(input: string, type: string, errorType: string = ''): boolean {
    return CHECK_INPUT(this.formApoderado, input , type, errorType, this.isSubmited);
  }

  dismiss(): void{
    this.modalService.dismissAll();
  }

  rptaObjs(num: string): string{

    const obj = {
      '101':	'La tarjeta ingresada se encuentra vencida. Por favor, comunícate con tu banco para mayor información.',
      '102':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '104':	'Tu tarjeta no tiene autorización para realizar esta operación. Por favor, comunícate con tu banco para mayor información.',
      '106':	'Has excedido la cantidad de intentos permitidos para ingresar tu contraseña. Por favor, comunícate con tu banco para mayor información.',
      '107':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '108':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '109':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '110':	'Tu tarjeta no tiene autorización para realizar esta operación. Por favor, comunícate con tu banco para más información.',
      '111':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '112':	'No has ingresado tu contraseña. Por favor, intenta nuevamente.',
      '113':  '',
      '116':	'Tu tarjeta tiene fondos insuficientes. Por favor, comunícate con tu banco para mayor información.',
      '117':	'La contraseña ingresada es incorrecta. Por favor, intenta nuevamente o comunícate con tu banco para mayor información.',
      '118':	'La tarjeta ingresada es inválida. Por favor, comunícate con tu banco para mayor información.',
      '119':	'Has excedido la cantidad de intentos permitidos para ingresar tu contraseña. Por favor, comunícate con tu banco para mayor información.',
      '121':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '126':	'La contraseña ingresada es incorrecta. Por favor, intenta nuevamente o comunícate con el banco para mayor información.',
      '129':	'La tarjeta ingresada es inválida. Por favor, comunícate con tu banco para mayor información.',
      '180':	'La tarjeta ingresada es inválida. Por favor, comunícate con tu banco para mayor información.',
      '181':	'Tu tarjeta de débito tiene restricciones. Por favor, comunícate con tu banco para mayor información.',
      '182':	'Tu tarjeta de crédito tiene restricciones. Por favor, comunícate con tu banco para mayor información.',
      '183':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento.',
      '190':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '191':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '192':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '199':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '201':	'La tarjeta ingresada se encuentra vencida. Por favor, comunícate con tu banco para mayor información.',
      '202':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '204':	'Tu tarjeta no tiene autorización para realizar esta operación. Por favor, comunícate con tu banco para mayor información.',
      '206':	'Has excedido la cantidad de intentos permitidos para ingresar tu contraseña. Por favor, comunícate con tu banco para mayor información.',
      '207':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '208':	'Tu tarjeta fue reportada como perdida. Por favor, comunícate con tu banco para mayor información.',
      '209':	'Tu tarjeta fue reportada como robada. Por favor, comunícate con tu banco para mayor información.',
      '263':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '264':	'Tu banco no se encuentra disponible en estos momentos. Por favor, intenta nuevamente en unos minutos.',
      '265':	'La clave secreta ingresada es incorrecta. Por favor, intenta nuevamente o comunícate con tu banco para mayor información.',
      '266':	'La tarjeta ingresada se encuentra vencida. Por favor, comunícate con tu banco para mayor información.',
      '280':	'La contraseña ingresada es incorrecta. Por favor, intenta nuevamente o comunícate con tu banco para mayor información.',
      '290':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '300':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '306':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '401':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para más información.',
      '404':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '405':	'Tu tarjeta ha superado la cantidad de compras máximas permitidas en el día. Por favor, intenta nuevamente con otra tarjeta.',
      '406':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '407':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '420':	'La tarjeta ingresada no es Visa. Recuerda que solo puedes realizar pagos con tarjeta Visa.',
      '421':	'Tu tarjeta fue reportada como riesgosa. Por favor, comunícate con tu banco.',
      '423':	'¡Disculpa! La comunicación ha sido interrumpida y el proceso de pago ha sido cancelado. Por favor, intenta nuevamente.',
      '424':	'Tu tarjeta fue reportada como riesgosa. Por favor, comunícate con tu banco.',
      '426':	'La venta no ha podido ser procesada, es posible que el link de pago no esté habilitado. Por favor, comunícate con el vendedor/establecimiento.',
      '427':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '428':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '429':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '430':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '431':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '432':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '433':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '434':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '435':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '436':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '437':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '438':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '439':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '440':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '441':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '442':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '443':	'Los datos de la tarjeta ingresados son inválidos. Por favor, ingresa el mes y el año de expiración de tu tarjeta de crédito.',
      '444':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '445':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '446':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '447':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '448':	'El número de cuotas ingresado es inválido. Recuerda que debes ingresar un número entero menor a 36.',
      '449':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '450':	'El número de tarjeta ingresado es inválido. Por favor, intenta nuevamente con otra tarjeta.',
      '451':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '452':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento.',
      '453':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '454':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '455':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '456':	'El monto de venta no ha sido ingresado. Por favor, intenta nuevamente.',
      '457':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '458':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '459':	'No has ingresado el número de tarjeta. Por favor, intenta nuevamente con otra tarjeta.',
      '460':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '461':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '462':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '463':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '464':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '465':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '466':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '467':	'El código “CVC” ingresado es inválido. Recuerda que el código “CVC” es un número entero de 3 o 4 dígitos. Si no logras visualizarlo, comunícate con tu banco.',
      '468':	'El código “CVC” ingresado es inválido. Recuerda que el código “CVC” es un número entero de 3 o 4 dígitos. Si no logras visualizarlo, comunícate con tu banco.',
      '469':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '470':	'El monto ingresado es inválido. Recuerda que solo debes ingresar números y punto decimal.',
      '471':	'El monto ingresado es inválido. Recuerda que solo debes ingresar números y punto decimal.',
      '472':	'El número de cuotas ingresado es inválido. Recuerda que debes ingresar un número entero menor a 36.',
      '473':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '474':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '475':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '476':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '477':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '478':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '479':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '480':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '481':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '482':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '483':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '484':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '485':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '486':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '487':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '488':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '489':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '490':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '491':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '492':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '493':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '494':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '495':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '496':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '497':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '498':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '619':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '666':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '667':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '668':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '670':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '672':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '673':	'Por favor, intenta nuevamente en unos minutos.',
      '674':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para más información.',
      '675':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para más información.',
      '678':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para más información.',
      '682':	'El proceso de pago ha sido cancelado. Por favor, intenta nuevamente en unos minutos.',
      '683':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para más información.',
      '684':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para más información.',
      '685':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para más información.',
      '690':	'Operación Denegada. Contactar con el comercio.',
      '691':	'Operación Denegada. Contactar con el comercio.',
      '692':	'Operación Denegada. Contactar con el comercio.',
      '754':	'Por favor, comunícate con la central de VisaNet al (01) 6149800 opción 4, opción 3 para poder ayudarte.',
      '904':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '909':	'La venta no ha podido ser procesada. Por favor, intenta nuevamente o comunícate con el vendedor/establecimiento para mayor información.',
      '910':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '912':	'Tu banco no se encuentra disponible para autenticar la venta. Por favor, intenta nuevamente más tarde.',
      '913':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '916':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '928':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '940':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '941':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '942':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '943':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '945':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '946':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '947':	'La venta no ha podido ser procesada. Por favor, comunícate con el vendedor/establecimiento para mayor información.',
      '948':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '949':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.',
      '965':	'La venta no ha podido ser procesada. Por favor, comunícate con tu banco para mayor información.'
    };

    return obj[num];
  }

  abrirInscrucciones() {
    //Swal.fire('', '<img src="https://www.munisantanita.gob.pe/data/talleres/instrucciones de pago.jpg"/>', 'info');
    Swal.fire({
      imageUrl: 'https://www.munisantanita.gob.pe/data/talleres/instrucciones de pago.jpg',
      imageAlt: 'Custom image',
      width: '60rem'
    })
  }
}
