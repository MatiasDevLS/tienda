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

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'datos', component: ListaComponent},
  {path: 'registro', component: RegisterComponent , canDeactivate: [PreventUnsavedChangesGuard]},
  {path: 'buscar', component: BuscadorComponent},
  {path: 'actualizador/:id', component: UpdaterComponent , canDeactivate: [PreventUnsavedChangesGuard] },
  {path: 'actualizadorFoto/:id', component: FotoUpdaterComponent },
  {path: 'visual', component: VisualComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
