import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_models/Usuario';
 
 
@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

      baseUrl = environment.apiUrl;
      constructor(private http: HttpClient) {}

      registrarUsuario( model: Usuario )
      {
        return this.http.post<Usuario>(this.baseUrl + "Usuarios/registroUsuario", model)
      }

      IniciarUsuario( model: Usuario )
      {
        return this.http.post<Usuario>(this.baseUrl + "Usuarios/inicioUsuario", model)
      }
}