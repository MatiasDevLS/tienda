import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ProductoG } from 'src/app/_models/ProductoG';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
    baseUrl = environment.apiUrl;
    private currentProductoSource = new BehaviorSubject<ProductoG | null>(null);
    currentProducto = this.currentProductoSource.asObservable();
    constructor(private http: HttpClient) {}

    register(model: any){
        return this.http.post<ProductoG>(this.baseUrl + 'registro', model).pipe(
          map(prod => {
            if (prod) {
              this.setCurrentProducto(prod);
            }
          })
        )
      }
    
      setCurrentProducto(producto: ProductoG){
        localStorage.setItem('producto', JSON.stringify(producto));
      }
}

