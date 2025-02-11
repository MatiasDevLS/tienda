import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsuarioService } from './Services/usuario.service';
import { Usuario } from './_models/Usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient, private usuarioServicio: UsuarioService) {}

  ngOnInit(): void {
    this.establecerUsuario()
  }

  establecerUsuario() {
    const stringUsuario = localStorage.getItem('usuario')
    if (!stringUsuario) return;
    const usuario: Usuario = JSON.parse(stringUsuario)
    this.usuarioServicio.establecerUsuario(usuario)
  }
}
