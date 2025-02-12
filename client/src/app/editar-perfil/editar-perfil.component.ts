import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../_models/Usuario';
import { UsuarioService } from '../Services/usuario.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
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
    this.usuarioService.usuarioActual$.subscribe({
      next: (valor: any) =>{
        this.usuario=valor
      }
    })
    this.initializeForm()

  }


  
  cancel(){
    this.cancelRegister.emit(false);
  }

   initializeForm() {
    this.registerForm = this.fb.group({
        nombre: [this.usuario.nombre,Validators.required],
        apellidos: [this.usuario.apellidos, Validators.required]
    });
  }



  registrar() {
    if (confirm("Cambiar los datos?")){
    var cambios = {...this.registerForm.value};
    this.usuario.nombre = cambios.nombre
    this.usuario.apellidos = cambios.apellidos
    this.creado=true;
    this.usuarioService.editarPerfil(this.usuario).subscribe({
      next: () => window.location.reload() 
    })
    
  }


}

}
