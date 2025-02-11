import { Component, OnInit } from '@angular/core';
import { Producto } from '../_models/Producto';
import { ProductoService } from '../Services/Producto.Service';
import { ToastrService } from 'ngx-toastr';
import localeEs from '@angular/common/locales/es';
import { formatCurrency, registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  producto!: Producto;
  BolElectrodomesticos: boolean = false;
  BolInformatica: boolean = false;
  formattedPrice: string = '';
  productos!: Producto[];
 constructor(private servicio: ProductoService, private toast: ToastrService) { }

  ngOnInit(): void {
    registerLocaleData(localeEs, 'es');
    this.crear()
  }


    FormatPrice(price: number): string {
      return formatCurrency(price, 'es-ES', 'EUR', 'symbol', '1.2-2');
    }
    
  crear() {
      this.servicio.getProductosVenta().subscribe({
        next: (valores: Producto[]) =>{
          this.productos=valores
        }
      });
    }
}
