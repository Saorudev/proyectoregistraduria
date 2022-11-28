import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidato } from '../modelos/candidato.model';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  
  constructor(private http: HttpClient) { }

  listar(): Observable<Candidato[]>{
    return this.http.get<Candidato[]>(`${environment.url_gateway}/candidatos`);
  }
  eliminar(id:string){
    return this.http.delete<Candidato>(`${environment.url_gateway}/candidatos/${id}`,);
  }
  getCandidato(id:string): Observable<Candidato>{
    return this.http.get<Candidato>(`${environment.url_gateway}/candidatos/${id}`);
  }
  crear(elCandidato: Candidato){
    return this.http.post(`${environment.url_gateway}/candidatos`,elCandidato);
  }
  editar(id:string,elCandidato: Candidato){
    return this.http.put(`${environment.url_gateway}/candidatos/${id}`,elCandidato);
  }
  /*
  asignarPartido(id:string,elCandidato: Candidato, id_partido){
    return this.http.put(`${environment.url_gateway}/candidatos/${id}/partidos/${id_partido}`,elCandidato);
  }*/
}
