import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Producto } from '../_models/Producto';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoHeaderFilterComponent } from 'devextreme-angular/ui/nested';
import { lastValueFrom } from 'rxjs';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ProductoService } from '../Services/Producto.Service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../Services/usuario.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData, formatCurrency } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

 
@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  jsonDataSource: CustomStore;
  showNavButtons = true;
  admin = false
  expanded: boolean = true;



  selectedItemKeys: string[] = [];
  admin_medio: boolean = false;
  admin_bajo: boolean = false;
  miembro: boolean = false;

  constructor(private http: HttpClient, private servicio: ProductoService, private toastr: ToastrService, private usuarioService : UsuarioService, private router: Router) {
    this.jsonDataSource = new CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            let params: HttpParams = new HttpParams();
            params.set('param1', 'value1');
            return lastValueFrom(this.http.get('https://localhost:5001/Api/Productos', { 
                    params: params
                }))
                .then(result => {
                    return result;
                })
                .catch(() => { throw 'Data loading error' });
        }
    });
}
  ngOnInit(): void {
    registerLocaleData(localeEs, 'es');
    this.usuarioService.usuarioActual$.subscribe({
      next: (valor: any) =>{
        if (valor.rol.includes("Admin",0)==true) this.admin=true
        if (valor.rol.includes("AdminMedio",0)==true) this.admin_medio=true
        if (valor.rol.includes("AdminBajo",0)==true) this.admin_bajo=true
        if (valor.rol.includes("Miembro",0)==true) this.miembro=true
      }
    })
  }

  
customizeColumns = (columns: any[]) => {
  columns.find(c => c.dataField === "precio").cellTemplate = this.precioCellTemplate;
}

formatCurrency(amount: number): string {

  const [integerPart, decimalPart] = amount.toFixed(2).split('.'); 

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); 

  return `${formattedIntegerPart},${decimalPart}€`; 
}

precioCellTemplate = (container: any, options: any)=> {
  
  const formattedValue = this.formatCurrency(options.data.precio);
  container.textContent = formattedValue;
}



  
  applyFilterTypes = [{
    key: 'auto',
    name: 'Immediately',
  }, {
    key: 'onClick',
    name: 'On Button Click',
  }];

  saleAmountHeaderFilter: DxoHeaderFilterComponent['dataSource'] = [{
    text: 'Menos de 50€',
    value: ['precio', '<', 50],
  }, {
    text: '50€ - 250€',
    value: [
      ['precio', '>=', 50],
      ['precio', '<', 250],
    ],
  }, {
    text: '250€ - 1000€',
    value: [
      ['precio', '>=', 250],
      ['precio', '<', 1000],
    ],
  }, {
    text: '1000€ - 5000€',
    value: [
      ['precio', '>=', 1000],
      ['precio', '<=', 5000],
    ],
  }, {
    text: 'Mas de 5000€',
    value: ['precio', '>', 5000],
  },
  {
  text: '5000€ - 10000€',
  value: [
    ['precio', '>=', 5000],
    ['precio', '<=', 10000],
  ],
},{
  text: '10000€ - 25000€',
  value: [
    ['precio', '>=', 10000],
    ['precio', '<=', 25000],
  ],
},
{
  text: 'Mas de 25000€',
  value: ['precio', '>', 25000],
}

];
  

  departamentoHeaderFilter: DxoHeaderFilterComponent['dataSource'] = [{
    text: 'Electrodomestico',
    value: ['departamento',"=" ,"Electrodomestico"]
  }, {
    text: 'Informatica',
    value: [
      ['departamento', '=', "Informatica"]
    ],
  }];

  showFilterRow = true;
  currentFilter = this.applyFilterTypes[0].key;
  showHeaderFilter = true;
  valor: string ="";

  eliminar(){
    if (confirm("Va a eliminar un producto?"))
        if (confirm('Confirma eliminar el producto con id: '+ this.selectedItemKeys[0])){
          this.servicio.eliminar(this.selectedItemKeys[0]).subscribe({
            next: () =>{
              this.dataGrid.instance.refresh(),
              this.toastr.success("Producto eliminado con exito","",{
                positionClass: 'toast-bottom-left'
              })
            },
            error: error => this.toastr.error("No se ha encontrado el producto", "Error ⚠", {
              positionClass: 'toast-bottom-left'
            })
          });
      };
  }

  producto!: Producto;
  BolElectrodomesticos: boolean = false;
  BolInformatica: boolean = false;
  Creado: boolean = false;
  parametros: any | [ ];
  formattedPrice: string = '';
  PRECIO!: string;
  modalRef?: BsModalRef;
  config = {
    animated: true
  };


FormatPrice(price: number): string {
    return formatCurrency(price, 'es-ES', 'EUR', 'symbol', '1.2-2');
  }


  crear() {
    this.dataGrid.visible=false
    this.servicio.getProducto(this.selectedItemKeys[0]).subscribe({
      next: (valor: Producto) =>{
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
        this.toastr.error("No se ha encontrado el id","Error ⚠", {
          positionClass: 'toast-bottom-left'})
        this.Creado=false
      } 
    });

    

  }

  onSelectionChanged({ selectedRowKeys }: DxDataGridTypes.SelectionChangedEvent) {
    this.selectedItemKeys = selectedRowKeys;
  }


  buscar() {
    this.servicio.getProducto(this.selectedItemKeys[0]).subscribe({
      next: (valor: Producto) =>{
        this.router.navigateByUrl('actualizador/' +this.selectedItemKeys[0])
      },
      error: error => this.toastr.error("No se ha encontrado el id","Error ⚠", {
        positionClass: 'toast-bottom-left'})
    });
  }

  buscarVentas() {
    this.servicio.getProducto(this.valor).subscribe({
      next: (valor: Producto) =>{
        this.router.navigateByUrl('ventas/' + this.selectedItemKeys[0])
      },
      error: error => this.toastr.error("No se ha encontrado el id","Error ⚠", {
        positionClass: 'toast-bottom-left'})
    });
  }
}




