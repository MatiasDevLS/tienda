import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../Services/Producto.Service';
import { Producto } from '../_models/Producto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  valor! : string
  constructor(private servicio: ProductoService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  crear() {
      this.servicio.getProducto(this.valor).subscribe({
        next: (valor: Producto) =>{
          this.router.navigateByUrl('actualizador/' + this.valor)
        },
        error: error => this.toast.error("No se ha encontrado el id","Error ⚠", {
          positionClass: 'toast-bottom-left'})
      });
    }

}
