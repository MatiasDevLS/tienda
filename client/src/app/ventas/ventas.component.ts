import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../Services/Producto.Service';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../_models/Producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
valor! : string
  constructor(private servicio: ProductoService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  crear() {
    this.servicio.getProducto(this.valor).subscribe({
      next: (valor: Producto) =>{
        this.router.navigateByUrl('ventas/' + this.valor)
      },
      error: error => this.toast.error("No se ha encontrado el id","Error ⚠", {
        positionClass: 'toast-bottom-left'})
    });
  }
}
