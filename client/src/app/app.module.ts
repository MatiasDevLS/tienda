import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxDataGridModule, DxListModule } from 'devextreme-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaComponent } from './lista/lista.component';
import { RegisterComponent } from './register/register.component';
import { TextInputComponent } from './register/text-input/text-input.component';
import { NavComponent } from './nav/nav.component';
import { InicioComponent } from './inicio/inicio.component';
import { VisualComponent } from './visual/visual.component';
import { UpdaterComponent } from './updater/updater.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { SharedModule } from './_modules/shared.module';
import { FotoUpdaterComponent } from './foto-updater/foto-updater.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { VentasComponent } from './ventas/ventas.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { VentasTabsComponent } from './ventas-tabs/ventas-tabs.component';
import { CompraComponent } from './compra/compra.component';
import { ZonaCompraComponent } from './zona-compra/zona-compra.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    RegisterComponent,
    TextInputComponent,
    NavComponent,
    InicioComponent,
    VisualComponent,
    UpdaterComponent,
    BuscadorComponent,
    FotoUpdaterComponent,
    VentasComponent,
    VentasTabsComponent,
    CompraComponent,
    ZonaCompraComponent,
    RegistroUsuarioComponent,
    InicioSesionComponent,
    RegistroAdminComponent,
    EditarPerfilComponent,
    ModalComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    DxDataGridModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DxButtonModule,
    SharedModule,
    ModalModule,
    TabsModule,
    BsDropdownModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    [BsModalService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
