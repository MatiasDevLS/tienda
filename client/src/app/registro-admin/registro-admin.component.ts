import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Usuario } from '../_models/Usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../Services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {

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
      rolPrincipal: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
        username: ['',Validators.required],
        password: ['', Validators.required]
    });
  }

  

  registrar() {
    if (confirm("Confirmar la creación del usuario")){
    this.usuario = {...this.registerForm.value};
    switch (this.usuario.rolPrincipal) {
      case "Admin":
        this.usuario.rol = ["Admin"]
        break;
        case "Admin_medio":
          this.usuario.rol = ["Admin_medio"]
          break;
          case "Admin_bajo":
            this.usuario.rol = ["Admin_bajo"]
            break;
      default:
        this.usuario.rol = []
        break;
    }
    this.creado=true;
    this.usuarioService.registrarUsuarioAdmin(this.usuario).subscribe()
    
  }


}

}
