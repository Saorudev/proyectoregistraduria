import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../modelos/usuario.model';
import { SeguridadService } from '../../../servicios/seguridad.service';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  correo: string = "";
  contrasena: string = "";

  constructor(private miServicioSeguridad : SeguridadService,
              private router : Router) { }

  ngOnInit(): void {
  }

  login():void{  
    let elUsuario:Usuario={
      correo:this.correo,
      contrasena:this.contrasena
    }
    this.miServicioSeguridad.login(elUsuario).subscribe(
      data => {
        this.router.navigate(['pages/dashboard']);
        this.miServicioSeguridad.guardarDatosSesion(data);
      },
      error =>{
        Swal.fire({
          title: 'Error Login',
          text: error["error"]["message"],
          icon: 'error',
          timer: 5000
        });
      }
    );
  }
}
