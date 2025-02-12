import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_models/Usuario';
import { BehaviorSubject, map } from 'rxjs';
 
 
@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

      iniciado = false
      baseUrl = environment.apiUrl;
      private estadoActual = new BehaviorSubject<Usuario |null >(null);
      usuarioActual$ = this.estadoActual.asObservable();
      constructor(private http: HttpClient) {}
      

      registrarUsuario( model: Usuario )
      {
        return this.http.post<Usuario>(this.baseUrl + "Usuarios/registroUsuario", model).pipe(
          map((valor: Usuario)=> {
            const usuario = valor;
            if (usuario) {
              localStorage.setItem('usuario', JSON.stringify(usuario))
              this.estadoActual.next(usuario)
            }
          })
        )
        
      }

      IniciarUsuario( model: Usuario )
      {
        return this.http.post<Usuario>(this.baseUrl + "Usuarios/inicioUsuario", model).pipe(
          map((valor: Usuario)=> {
            const usuario = valor;
            if (usuario) {
              localStorage.setItem('usuario', JSON.stringify(usuario))
              this.estadoActual.next(usuario)
            }
          })
        )
      }

      establecerUsuario(usuario: Usuario){
        this.estadoActual.next(usuario);
      }

      cerrarSesion(){
        localStorage.removeItem('usuario')
        this.estadoActual.next(null)
        window.location.reload()
      }
}