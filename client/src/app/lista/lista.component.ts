import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../_models/Producto';
import { AppService } from '../Services/app.service';
import { DxDataGridComponent } from 'devextreme-angular';

 
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
  
  showFilterRow = true;
  currentFilter = this.applyFilterTypes[0].key;
  showHeaderFilter = true;
    employees: Producto[] = [];
    link: string = 'https://localhost:5001/Api/Productos';


    constructor(private service: AppService, private http: HttpClient) {}

  ngOnInit(): void {
    this.service.getProductos();
  }

    
  
}