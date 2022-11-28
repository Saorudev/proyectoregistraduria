import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Candidato } from '../../../modelos/candidato.model';
import { CandidatoService } from '../../../servicios/candidato.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  candidatos : Candidato[];
  nombresColumnas: string[] = ['Cedula', 'Numero Resolucion', 'Nombre', 'Apellido', 'Partido'];
  constructor(private miServicioCandidatos: CandidatoService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar(): void {
    this.miServicioCandidatos.listar().subscribe(data => {
      this.candidatos = data;});
  }
  agregar(): void {
    this.router.navigate(["pages/candidatos/crear"]);
  }
  editar(id:string): void {
    this.router.navigate(["pages/candidatos/actualizar/"+id]);
  }
  eliminar(id:string): void {
    Swal.fire({
      title: 'Eliminar Candidato',
      text: " ¿Está seguro que desea eliminar el candidato?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed){
        this.miServicioCandidatos.eliminar(id).
        subscribe(data => {
          Swal.fire(
            'Candidato Eliminado!',
            'El candidato ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }

}
