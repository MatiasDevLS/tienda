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
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'

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
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
