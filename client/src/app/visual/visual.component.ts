import { Component, OnInit, TemplateRef } from '@angular/core';
import { Producto } from '../_models/Producto';
import { ProductoService } from '../Services/Producto.Service';
import localeEs from '@angular/common/locales/es';
import { formatCurrency, registerLocaleData } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  formattedPrice: string = '';
  PRECIO!: string;
  modalRef?: BsModalRef;
  config = {
    animated: true
  };

  constructor(private servicio: ProductoService, private toast: ToastrService, private modalService: BsModalService) { }

  ngOnInit(): void {
    registerLocaleData(localeEs, 'es');
  }

  FormatPrice(price: number): string {
    return formatCurrency(price, 'es-ES', 'EUR', 'symbol', '1.2-2');
  }


  crear() {
    if (this.valor=="") this.valor="vacio";
    this.servicio.getProducto(this.valor).subscribe({
      next: (valor: Producto) =>{
        if (this.valor=="") this.toast.error("No se ha encontrado el id","Error", {
          positionClass: 'toast-bottom-left'});
        this.Creado=true
        this.producto=valor
        this.PRECIO=this.FormatPrice(this.producto.precio)
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
      error: error =>{
        this.toast.error("No se ha encontrado el id","Error ⚠", {
          positionClass: 'toast-bottom-left'})
        this.Creado=false
      } 
    });
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
}
