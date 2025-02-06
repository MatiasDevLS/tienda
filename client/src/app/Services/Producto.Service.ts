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
    constructor(private http: HttpClient) {}

    register(model: Producto){
        return this.http.post<Producto>(this.baseUrl + 'Productos/registro', model)
      }
    

      getProducto(id: string) {
        return this.http.get<Producto>(this.baseUrl + 'Productos/' + id);
      }

      eliminar(id: string){
        return this.http.delete<Producto>(this.baseUrl + 'Productos/borrar/'+ id)
      }

      actualizar(model: Producto){
        return this.http.post(this.baseUrl + 'Productos/cambios', model)
      }

      subirFoto(id: string, foto: File){
        console.log(foto);
      }
}

