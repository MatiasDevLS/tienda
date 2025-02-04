import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../Services/Producto.Service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../_models/Producto';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  boolInfor: boolean = false;
  boolElec: boolean = false;
  model: any = {}
  producto!: Producto
  
  constructor( private fb: FormBuilder, private router: Router, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.initializeForm()
  }


  
  cancel(){
    this.cancelRegister.emit(false);
  }

   initializeForm() {
    this.registerForm = this.fb.group({
      departamento: ['',Validators.required],
      id: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
        consumo: [''],
        localizacion: ['',],
        descripcion: ['',Validators.required],
        marca: ['', Validators.required],
        fotoUrl: ['', Validators.required],
        tipo: [''],
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
    this.producto = {...this.registerForm.value};
    this.productoService.register(this.producto).subscribe({
      next: () => {
        this.router.navigateByUrl('datos')
      }
    })
  }

  }


 
