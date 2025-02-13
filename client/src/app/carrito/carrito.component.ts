import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../Services/usuario.service';
import { Compra } from '../_models/Compra';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../Services/Producto.Service';
import { Producto } from '../_models/Producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito!: Compra []
  precioTotal: string | null= localStorage.getItem('total')
  listo = false
  producto!: Producto

  constructor(private usuarioService: UsuarioService , private toast: ToastrService, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.carrito = this.usuarioService.mostrarCarrito().carrito
    this.obtenerProductos()
    this.total()
    this.listo=true
  }

  comprar(){
    if (confirm("Usted va a realizar una compra con un coste de "+localStorage.getItem('total'))==true){
    this.carrito.forEach(compra => {
      this.usuarioService.añadirCarrito(compra.id, compra.cantidad)
         
        
        //   this.servicio.putComprar(this.id, this.cantidadProd).subscribe({
        //     next: () => {
        //       this.toast.success("Gracias por su compra")
        //       this.router.navigate(['compra']);
        //     },
        //     error: () =>{this.toast.error("Número mayor al del stock", "Error ⚠", {
        //             positionClass: 'toast-bottom-left'
        //     })
            
        //   }
        //   });
        //   }
        });
      }
        

  
  }

  total(){
    var total: number=0
    localStorage.setItem('total',total.toString())
    this.carrito.forEach(compra => {
      this.productoService.getProducto(compra.id).subscribe({
        next: (producto: Producto) => {
         total = Number(localStorage.getItem('total')) 
         total+=(producto.precio*compra.cantidad)
         localStorage.setItem('total',total.toString())
        }
      })
    });

  }

  obtenerProductos(){
    this.carrito.forEach(valor => {
      this.productoService.getProducto(valor.id).subscribe({
        next: (valor: Producto) => {
          this.producto = valor
        }
      })
    });
  }

}
