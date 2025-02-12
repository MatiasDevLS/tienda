import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Usuario } from '../_models/Usuario';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../Services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
   @ViewChild('editForm') editForm: NgForm | undefined;
    @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any) {
      if (this.editForm?.dirty) {
        $event.returnValue = true;
      }
    }
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  model: any = {}
  creado: boolean = false
  id: string | undefined
  usuario!: Usuario

  constructor( private fb: FormBuilder, private router: Router, private usuarioService: UsuarioService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm()

  }


  
  cancel(){
    this.cancelRegister.emit(false);
  }

   initializeForm() {
    this.registerForm = this.fb.group({
        username: ['',Validators.required],
        password: ['', Validators.required]
    });
  }



  registrar() {
    if (confirm("Desea iniciar sesión?")){
    this.usuario = {...this.registerForm.value};
    this.creado=true;
    this.usuarioService.IniciarUsuario(this.usuario).subscribe()
    this.router.navigate([''])
  }


}

}
