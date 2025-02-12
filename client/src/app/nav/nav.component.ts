import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../Services/usuario.service';
import { Usuario } from '../_models/Usuario';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  usuario!: Usuario
  iniciado=false
  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.usuarioActual$.subscribe({
      next: (valor: any) =>{
        this.usuario=valor;
        this.iniciado= !!valor;
      }
    })
    this.usuarioActual()
  }

  usuarioActual() {
      const stringUsuario = localStorage.getItem('usuario');
      if (!stringUsuario) return;
      const usuario: Usuario = JSON.parse(stringUsuario);
      this.usuario=usuario
      this.iniciado=true;
      this.usuarioService.establecerUsuario(usuario)
  }

  cerrar(){
    this.usuarioService.cerrarSesion()
  }

}
