import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../Services/Producto.Service';
import { Producto } from '../_models/Producto';
import { formatCurrency, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';

@Component({
  selector: 'app-ventas-tabs',
  templateUrl: './ventas-tabs.component.html',
  styleUrls: ['./ventas-tabs.component.css']
})
export class VentasTabsComponent implements OnInit {

  id!: string
  productoEncontrado!: Producto
  cantidad!:number
  cantidadVenta!:number
  cantidadQuitarVenta!: number
  formattedPrice: string = '';
  PRECIO!: string;
  ganancias!:string

    constructor( private fb: FormBuilder, private router: Router, private productoService: ProductoService, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
      registerLocaleData(localeEs, 'es');
        this.id =this.activatedRoute.snapshot.paramMap.get('id')!;
        this.productoService.getProducto(this.id).subscribe({
          next: (valor : Producto) => {
            this.productoEncontrado = valor;
          }
        })
  }

  addStock()
  {
    if (confirm("Está apunto de añadir a stock "+this.cantidad+" productos")==true){
      this.productoService.añadirStock(this.id, this.cantidad).subscribe();
      window.location.reload();
    };
  }

  ponerVenta()
  {
    if (confirm("Está apunto de poner en venta "+this.cantidadVenta+" productos")==true){
    this.productoService.ponerVenta(this.id, this.cantidadVenta).subscribe({
      next: () => window.location.reload(),
      error: () =>{this.toastr.error("No puede poner a la venta más productos de los existentes", "Error ⚠", {
              positionClass: 'toast-bottom-left'
      })
       
    }
    });
    }
  }

  quitarVenta()
  {
    if (confirm("Está apunto de quitar en venta "+this.cantidadQuitarVenta+" productos")==true){
    this.productoService.quitarVenta(this.id, this.cantidadQuitarVenta).subscribe({
      next: () => window.location.reload(),
      error: () =>{this.toastr.error("No puede quitar de la venta más productos de los existentes", "Error ⚠", {
              positionClass: 'toast-bottom-left'
      })
       
    }
    });
    
    }
  }

  FormatPrice(price: number): string {
      return formatCurrency(price, 'es-ES', 'EUR', 'symbol', '1.2-2');
    }
}
