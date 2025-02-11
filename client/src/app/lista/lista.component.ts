import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Producto } from '../_models/Producto';
import { AppService } from '../Services/app.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoHeaderFilterComponent } from 'devextreme-angular/ui/nested';
import { delay, lastValueFrom, toArray } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ProductoService } from '../Services/Producto.Service';
import { ToastrService } from 'ngx-toastr';

 
@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.css']
})
export class ListaComponent{
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  jsonDataSource: CustomStore;
  showNavButtons = true;



  selectedItemKeys: string[] = [];

  constructor(private http: HttpClient, private servicio: ProductoService, private toastr: ToastrService) {
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
        if (confirm('Confirma eliminar el producto con id: '+ this.valor)){
          this.servicio.eliminar(this.valor).subscribe({
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
  }




