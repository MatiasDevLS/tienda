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
import { NavComponent } from './nav/nav.component';
import { AutorizarGuard } from './_guards/autorizar.guard';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'compra', component: CompraComponent},
  {path: 'registroUsuario', component: RegistroUsuarioComponent},
  {path: 'inicioSesion', component: InicioSesionComponent},
  {path: '', 
    runGuardsAndResolvers: 'always',
    canActivate: [AutorizarGuard],
    children: [
      {path: 'datos', component: ListaComponent},
      {path: 'buscar', component: BuscadorComponent},
      {path: 'registro', component: RegisterComponent , canDeactivate: [PreventUnsavedChangesGuardRegister]},
      {path: 'actualizador/:id', component: UpdaterComponent , canDeactivate: [PreventUnsavedChangesGuard] },
      {path: 'actualizadorFoto/:id', component: FotoUpdaterComponent },
      {path: 'visual', component: VisualComponent},
      {path: 'ventas', component: VentasComponent},
      {path: 'ventas/:id', component: VentasTabsComponent},
      {path: 'compra/zona/:id', component: ZonaCompraComponent},
      {path: 'editarPerfil', component: EditarPerfilComponent},
      {path: 'registroAdmin', component: RegistroAdminComponent},
      {path: 'carrito', component: CarritoComponent},
    ]},
    {path: '**', component: InicioComponent, pathMatch: 'full'},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
