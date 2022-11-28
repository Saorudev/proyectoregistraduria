import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidato } from '../../../modelos/candidato.model';
import { CandidatoService } from '../../../servicios/candidato.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  modoCreacion: boolean = true;
  id_candidato: string = "";
  intentoEnvio: boolean = false;
  elCandidato: Candidato = {
    cedula: "",
    numero_resolucion: "",
    nombre: "",
    apellido: "",
  }
  constructor(private miServicioCandidatos: CandidatoService, private rutaActiva: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    if( this.rutaActiva.snapshot.params.id_candidato){
      this.modoCreacion = false;
      this.id_candidato = this.rutaActiva.snapshot.params.id_candidato;
      this.getCandidato ( this.id_candidato)
    }
    else{
      this.modoCreacion = true;
    }
  }

  getCandidato(id: string){
    this.miServicioCandidatos.getCandidato(id).subscribe(data => {this.elCandidato = data});
  }

  agregar(): void{
    if (this.validarDatosCompletos()){
      this.intentoEnvio = true; 
      this.miServicioCandidatos.crear(this.elCandidato).subscribe(data => { 
        Swal.fire(
          'Candidato Creado',
          'El candidato ha sido creada correctamente',
          'success'
        )
        this.router.navigate(["pages/candidatos/listar"]);
      });
    }
  }

  editar(): void {
    if( this.validarDatosCompletos()){
      this.miServicioCandidatos.editar(this.elCandidato._id, this.elCandidato).subscribe(data => {
        Swal.fire(
          'Candidato Actualizado',
          'El candidato ha sido actualizado correctamente',
          'success'
        )
        this.router.navigate(["pages/candidatos/listar"]);
      });
    }
  }

  validarDatosCompletos(): boolean{
    this.intentoEnvio = true;
    if( this.elCandidato.cedula == "" || this.elCandidato.numero_resolucion == "" || this.elCandidato.nombre == "" || this.elCandidato.apellido == ""){
      return false;
    }
    else{
      return true;
    }
  }

}
