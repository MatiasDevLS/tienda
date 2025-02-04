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
  BolInformatica: boolean = false;
  Creado: boolean = false;
  parametros: any | [ ];
  valor: string ="";
  constructor(private servicio: ProductoService) { }

  ngOnInit(): void {
  }


  crear() {
    this.servicio.getProducto(this.valor).subscribe({
      next: (valor: Producto) =>{
        this.Creado=true
        this.producto=valor
        console.log(this.producto)
        if (this.producto.departamento == "Electrodomesticos"){
          this.BolInformatica = false;
          this.BolElectrodomesticos = true;

        }
        else if(this.producto.departamento == "Informatica"){
          this.BolElectrodomesticos = false;
          this.BolInformatica = true;
        }
      },
      error: error => console.log("No se ha encontrado el id") 
    });
  }
}
