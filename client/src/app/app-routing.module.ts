import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { RegisterComponent } from './register/register.component';
import { InicioComponent } from './inicio/inicio.component';
import { VisualComponent } from './visual/visual.component';
import { UpdaterComponent } from './updater/updater.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { FotoUpdaterComponent } from './foto-updater/foto-updater.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { PreventUnsavedChangesGuardRegister } from './_guards/prevent-unsaved-changes-register.guard';
import { VentasComponent } from './ventas/ventas.component';
import { VentasTabsComponent } from './ventas-tabs/ventas-tabs.component';
import { CompraComponent } from './compra/compra.component';
import { ZonaCompraComponent } from './zona-compra/zona-compra.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'datos', component: ListaComponent},
  {path: 'registro', component: RegisterComponent , canDeactivate: [PreventUnsavedChangesGuardRegister]},
  {path: 'buscar', component: BuscadorComponent},
  {path: 'actualizador/:id', component: UpdaterComponent , canDeactivate: [PreventUnsavedChangesGuard] },
  {path: 'actualizadorFoto/:id', component: FotoUpdaterComponent },
  {path: 'visual', component: VisualComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'ventas/:id', component: VentasTabsComponent},
  {path: 'compra', component: CompraComponent},
  {path: 'compra/zona/:id', component: ZonaCompraComponent},
  {path: 'registroUsuario', component: RegistroUsuarioComponent},
  {path: 'inicioSesion', component: InicioSesionComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
