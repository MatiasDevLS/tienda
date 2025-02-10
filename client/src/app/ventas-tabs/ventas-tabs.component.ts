import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../Services/Producto.Service';
import { Producto } from '../_models/Producto';

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

    constructor( private fb: FormBuilder, private router: Router, private productoService: ProductoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
        this.id =this.activatedRoute.snapshot.paramMap.get('id')!;
        this.productoService.getProducto(this.id).subscribe({
          next: (valor : Producto) => {
            this.productoEncontrado = valor;
          }
        })
  }

  addStock()
  {
    this.productoService.añadirStock(this.id, this.cantidad).subscribe();
    window.location.reload()
  }

  ponerVenta()
  {
    this.productoService.ponerVenta(this.id, this.cantidadVenta).subscribe();
    window.location.reload()
  }

}
