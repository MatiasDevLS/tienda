import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../_models/Producto';
import { map } from 'rxjs';
 
 
@Injectable({
    providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}
  
  getProductos<Producto>(){
    this.http.get<Producto>('https://localhost:5001/Api/Productos')
  }
}