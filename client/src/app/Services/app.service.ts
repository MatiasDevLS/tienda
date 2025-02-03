import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Producto } from 'src/app/_models/Producto';
import { environment } from 'src/environments/environment';
 
 
@Injectable({
    providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) {}
  
  getProductos(){
    return this.http.get<Producto>('https://localhost:5001/electronica/Producto');
  }
}