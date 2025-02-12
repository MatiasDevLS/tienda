import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { delay, map, Observable } from 'rxjs';
import { UsuarioService } from '../Services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AutorizarGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private toast: ToastrService) {}

  canActivate(): Observable<boolean> {
    return this.usuarioService.usuarioActual$.pipe(
      map(usuario => {
        if (usuario!=null) return true;
        else {
          alert("Registrese o inicie sesión")
          return false
        }
      })
    )
  }
  
}
