import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

 
@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
    employees: Producto[] = [];
    link: string = 'https://localhost:5001/electronica/Producto/';

    constructor(private service: EmployeesService, private http: HttpClient) {}

  ngOnInit(): void {
    this.service.getProductos();
  }

    
  
}