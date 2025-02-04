import { Component, OnInit } from '@angular/core';
import { Producto } from '../_models/Producto';
import { ProductoService } from '../Services/Producto.Service';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent implements OnInit {
  producto!: Producto;
  BolElectrodomesticos: boolean = false;
  parametros: any | [ ];
  constructor(private servicio: ProductoService) { }

  ngOnInit(): void {
    this.servicio.getProducto("3322113G").subscribe({
      next: (valor: Producto) =>{
        this.producto=valor
        console.log(this.producto)
        if (this.producto.departamento == "Electrodomesticos"){
          this.BolElectrodomesticos = true;
        }
      } 
    });
  }


  crear() {

  }
}
