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

    constructor( private fb: FormBuilder, private router: Router, private productoService: ProductoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
        this.id =this.activatedRoute.snapshot.paramMap.get('id')!;
        this.productoService.getProducto(this.id).subscribe({
          next: (valor : Producto) => {
            this.productoEncontrado = valor;
          }
        })
  }

}
