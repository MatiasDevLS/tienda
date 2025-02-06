import { Component, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../Services/Producto.Service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Producto } from '../_models/Producto';
@Component({
  selector: 'app-updater',
  templateUrl: './updater.component.html',
  styleUrls: ['./updater.component.css']
})
export class UpdaterComponent {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  registerFormBuscar: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  boolInfor: boolean = false;
  boolElec: boolean = false;
  model: any = {}
  producto!: Producto
  productoEncontrado!: Producto
  id!: string
  actualizarFoto: boolean = true
  
  constructor( private fb: FormBuilder, private router: Router, private productoService: ProductoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id =this.activatedRoute.snapshot.paramMap.get('id')!;
    this.productoService.getProducto(this.id).subscribe({
      next: (valor : Producto) => {
        this.productoEncontrado = valor;
        if (this.productoEncontrado.departamento == "Electrodomesticos") this.boolElec = true
        else this.boolInfor = true
        this.initializeForm(this.productoEncontrado.nombre, this.productoEncontrado.precio, this.productoEncontrado.consumo, this.productoEncontrado.localizacion, this.productoEncontrado.descripcion, this.productoEncontrado.marca, this.productoEncontrado.fotoUrl, this.productoEncontrado.tipo)

      }
    })
  }


  
  cancel(){
    this.cancelRegister.emit(false);
  }

   initializeForm(nomb: String, pre: number, con: String , loc: String, des: String, mar: String, fot: String, tip: String) {
    this.registerForm = this.fb.group({
      id: [this.productoEncontrado.id],
      departamento: [this.productoEncontrado.departamento],
      nombre: [nomb, Validators.required],
      precio: [pre, Validators.required],
        consumo: [con],
        localizacion: [loc],
        descripcion: [des,Validators.required],
        marca: [mar, Validators.required],
        tipo: [tip]
    });
  }

  comprobarInformatica(){
    this.boolInfor=true;
    this.boolElec=false;
  }

  comprobarElectrodomesticos(){
    this.boolElec=true;
    this.boolInfor=false;
  }

  registrar() {
    if (confirm("Confirmar cambios")){
    this.actualizarFoto = true
    this.producto = {...this.registerForm.value};
    this.productoService.actualizar(this.producto).subscribe({
      next: () => {
        this.router.navigateByUrl('../datos')
        this.recargarPag()
      }
    })
  }
  }

  cambiarFoto(){
    this.actualizarFoto=true
  }

  noCambiarFoto(){
    this.actualizarFoto=false
  }

  recargarPag(){
    window.location.reload()
  }

}




 
