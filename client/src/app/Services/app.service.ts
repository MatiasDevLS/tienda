import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../_models/Producto';
 
 
@Injectable({
    providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}
  
  getProductos(){
    return this.http.get<Producto>('https://localhost:5001/electronica/Productos');
  }
}