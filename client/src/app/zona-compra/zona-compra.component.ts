import { formatCurrency, registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../Services/Producto.Service';
import { ToastrService } from 'ngx-toastr';
import localeEs from '@angular/common/locales/es';
import { Producto } from '../_models/Producto';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../Services/usuario.service';

@Component({
  selector: 'app-zona-compra',
  templateUrl: './zona-compra.component.html',
  styleUrls: ['./zona-compra.component.css']
})
export class ZonaCompraComponent implements OnInit {

  id!: string
  producto!: Producto
  cantidadProd!:number

  constructor(private servicio: ProductoService, private toast: ToastrService, private activatedRoute: ActivatedRoute, private router:Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.id =this.activatedRoute.snapshot.paramMap.get('id')!;
    registerLocaleData(localeEs, 'es');
    this.crear()
    console.log(document.querySelector("input"))
  }


    FormatPrice(price: number): string {
      return formatCurrency(price, 'es-ES', 'EUR', 'symbol', '1.2-2');
    }
    
  crear() {
      this.servicio.getProducto(this.id).subscribe({
        next: (valor: Producto) =>{
          this.producto=valor;
        }
      });
    }

  comprar(){
    if (this.cantidadProd==0 || this.cantidadProd==null)  this.toast.error("Ha introducido un número inválido", "Error ⚠", {
      positionClass: 'toast-bottom-left'
})
  else
    if (confirm("Usted va a realizar una compra con un coste de "+this.FormatPrice(this.producto.precio*this.cantidadProd))==true){
      this.servicio.putComprar(this.id, this.cantidadProd).subscribe({
        next: () => {
          this.toast.success("Gracias por su compra")
          this.router.navigate(['compra']);
        },
        error: () =>{this.toast.error("Número mayor al del stock", "Error ⚠", {
                positionClass: 'toast-bottom-left'
        })
         
      }
      });
      }
    }

    carrito(){
      if (this.cantidadProd==0 || this.cantidadProd==null)  this.toast.error("Ha introducido un número inválido", "Error ⚠", {
        positionClass: 'toast-bottom-left'
  })
  else{
    if (this.cantidadProd>Number(document.querySelector("input")?.max)) 
      this.toast.error("Número mayor al del stock", "Error ⚠", {
        positionClass: 'toast-bottom-left'
})
  else{
      this.usuarioService.añadirCarrito(this.id, this.cantidadProd)
      if (this.cantidadProd>1)
        this.toast.success("Ha añadido al carrito "+this.cantidadProd+ " productos con éxito")
      else
        this.toast.success("Ha añadido al carrito "+this.cantidadProd+ " producto con éxito")
  }
  }

    }
    

  }

