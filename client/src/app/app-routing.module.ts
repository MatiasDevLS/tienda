import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { VisualComponent } from './visual/visual.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'datos', component: ListaComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'visual', component: VisualComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
