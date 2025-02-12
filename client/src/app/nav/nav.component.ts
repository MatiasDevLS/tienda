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
  admin= false
  admin_medio=false
  admin_bajo=false
  miembro=false
  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.usuarioActual$.subscribe({
      next: (valor: any) =>{
        this.usuario=valor;
        if (valor.rol.includes("Admin",0)==true) this.admin=true
        if (valor.rol.includes("Admin_medio",0)==true) this.admin_medio=true
        if (valor.rol.includes("Admin_bajo",0)==true) this.admin_bajo=true
        if (valor.rol.includes("Miembro",0)==true) this.miembro=true
        this.iniciado= !!valor;
      }
    })
  }


  cerrar(){
    this.usuarioService.cerrarSesion()
  }

}
