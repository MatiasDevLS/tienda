import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../_models/Producto';
import { AppService } from '../Services/app.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxoHeaderFilterComponent } from 'devextreme-angular/ui/nested';
import { toArray } from 'rxjs';

 
@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent | undefined;

  applyFilterTypes = [{
    key: 'auto',
    name: 'Immediately',
  }, {
    key: 'onClick',
    name: 'On Button Click',
  }];

  saleAmountHeaderFilter: DxoHeaderFilterComponent['dataSource'] = [{
    text: 'Menos de 50€',
    value: ['SaleAmount', '<', 50],
  }, {
    text: '50€ - 250€',
    value: [
      ['SaleAmount', '>=', 50],
      ['SaleAmount', '<', 250],
    ],
  }, {
    text: '250€ - 1000€',
    value: [
      ['SaleAmount', '>=', 250],
      ['SaleAmount', '<', 1000],
    ],
  }, {
    text: '1000€ - 5000€',
    value: [
      ['SaleAmount', '>=', 1000],
      ['SaleAmount', '<', 5000],
    ],
  }, {
    text: 'Mas de 5000€',
    value: ['SaleAmount', '>=', 5000],
  }];
  
  showFilterRow = true;
  currentFilter = this.applyFilterTypes[0].key;
  showHeaderFilter = true;
  valores : Producto[] | undefined;
  link: string = 'https://localhost:5001/Api/Productos';


    constructor(private service: AppService, private http: HttpClient) {}

  ngOnInit(): void {
    
  }

    
  
}