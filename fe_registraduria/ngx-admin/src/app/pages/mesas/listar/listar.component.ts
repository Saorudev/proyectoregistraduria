import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Mesa } from '../../../modelos/mesa.model';
import { MesaService } from '../../../servicios/mesa.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  mesas : Mesa[];
  nombresColumnas: string[] = ['Numero','Cantidad Inscritos'];
  constructor(private miServicioMesas: MesaService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar(): void {
    this.miServicioMesas.listar().subscribe(data => {
      this.mesas = data;});
  }
  agregar(): void {
    this.router.navigate(["pages/mesas/crear"]);
  }
  editar(id:string): void {
    this.router.navigate(["pages/mesas/actualizar/"+id]);
  }
  eliminar(id:string): void {
    Swal.fire({
      title: 'Eliminar Mesa',
      text: " ¿Está seguro que desea eliminar la mesa?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed){
        this.miServicioMesas.eliminar(id).
        subscribe(data => {
          Swal.fire(
            'Mesa Eliminada!',
            'La mesa ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}
