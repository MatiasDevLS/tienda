import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UpdaterComponent } from '../updater/updater.component';
import { RegisterComponent } from '../register/register.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuardRegister implements CanDeactivate<RegisterComponent> {
  canDeactivate(register: RegisterComponent): boolean {
    if (register.editForm?.dirty) {
      return confirm("Estas seguro que quieres continuar? Todos los guardos sin cambiar serán eliminados");
    }
    return true
  }

}

