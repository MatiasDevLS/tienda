import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../Services/Producto.Service';
import { Producto } from '../_models/Producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  valor! : string
  constructor(private servicio: ProductoService, private router: Router) { }

  ngOnInit(): void {
  }

  crear() {
      this.servicio.getProducto(this.valor).subscribe({
        next: (valor: Producto) =>{
          this.router.navigateByUrl('actualizador/' + this.valor)
        },
        error: error => console.log("No se ha encontrado el id") 
      });
    }

}
