import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../_models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
    baseUrl = environment.apiUrl;
    private currentProductoSource = new BehaviorSubject<Producto| null>(null);
    currentProducto = this.currentProductoSource.asObservable();
    constructor(private http: HttpClient) {}

    register(model: any){
        return this.http.post<Producto>(this.baseUrl + 'registro', model).pipe(
          map(prod => {
            if (prod) {
              this.setCurrentProducto(prod);
            }
          })
        )
      }
    
      setCurrentProducto(producto: Producto){
        localStorage.setItem('producto', JSON.stringify(producto));
      }

      getProducto(id: string) {
        return this.http.get<Producto>(this.baseUrl + 'Productos/' + id);
      }
}

