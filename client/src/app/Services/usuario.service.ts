import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_models/Usuario';
import { BehaviorSubject, map } from 'rxjs';
import { Compra } from '../_models/Compra';
 
 
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

      registrarUsuarioAdmin( model: Usuario )
      {
        return this.http.post<Usuario>(this.baseUrl + "Usuarios/registroUsuarioAdmin", model).pipe()
        
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

      editarPerfil(model: Usuario)
      {
        return this.http.put<Usuario>(this.baseUrl + "Usuarios/editarUsuario", model).pipe(
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

      añadirCarrito(id: string, cantidad : number){
        var existe=false
        const json = localStorage.getItem('usuario') !
        var valor: Usuario = JSON.parse(json)
        var compra: Compra = {id, cantidad}
        if (valor.carrito==undefined) valor.carrito=[]
        for(let i=0; i<valor.carrito.length; i++){
          if (valor.carrito[i].id==id){
            valor.carrito[i].cantidad=cantidad
            existe=true
          } 
        }
        if (existe==false) valor.carrito.push(compra)
        localStorage.setItem('usuario', JSON.stringify(valor))
        
      }

      mostrarCarrito(){
         const json= localStorage.getItem('usuario') !
         var carrito = JSON.parse(json)
         return carrito
      }
}