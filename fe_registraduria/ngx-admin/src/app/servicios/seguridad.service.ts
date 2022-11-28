
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  elUsuario = new BehaviorSubject<Usuario>(new Usuario);
  constructor(private http: HttpClient, private router: Router) 
  {
    this.verificarSesionActual();
  }
  /**  
    *Obtener informacion de usuario y acceder a la informacion del token
  */
  public get usuarioSesionActiva(): Usuario {
    return this.elUsuario.value;
  }
  /** 
    *Permite actualizar la informacion del usuario despues de validarse ok
    *@param user
  */ 

  setUsuario(user: Usuario){
    this.elUsuario.next(user);
  }
  /** 
    *Permite obtener la informacion con datos como el identificador y el token
    *@retunrs
  */

  getUsuario(){
    return this.elUsuario.asObservable();
  }
  /**
    *Comprueba si existe el correo y contraseña con el backend 
    *@param infoUsuario
    *@returns
  */
  
  login(infoUsuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.url_gateway}/login`, infoUsuario);
  }
  /**
    *Guarda el id, el token en el local storage del navegador 
    *@param datosSesion 
    *@returns
  */
  guardarDatosSesion(datosSesion: any){
    /*let sesionActual = localStorage.getItem('sesion')
      let data: Usuario = {
        _id: datosSesion.user_id,
        token: datosSesion.token,
      };
      localStorage.setItem('sesion', JSON.stringify(data));
      this.setUsuario(data);*/
      /*
    let sesionActual = localStorage.getItem('sesion');
    console.log("sesion actual " + sesionActual);
    if (sesionActual){
      return false;
    }else {
      let data: Usuario = {
        _id: datosSesion.user_id,
        token: datosSesion.token,
      };
      localStorage.setItem('sesion', JSON.stringify(data));
      this.setUsuario(data);
      return true;*/
      let sesionActual = localStorage.getItem('sesion');
      console.log("sesion actual "+sesionActual);
        let data: Usuario = {
          _id: datosSesion.user_id,
          token:datosSesion.token,
        };
      localStorage.setItem('sesion', JSON.stringify(data));
      this.setUsuario(data);
    }
  
  /* Cierra la sesion */
  logout(){
    localStorage.removeItem('sesion');
    this.setUsuario(new Usuario());
  }
  /*Permite si en la Db local storageesta la informacion del usuario */
  verificarSesionActual(){
    let sesionActual = this.getDatosSesion();
    if (sesionActual) {
      this.setUsuario(JSON.parse(sesionActual));
    }
  }
  /** Verifica si hay una sesion activa
   * @returns
   */
  sesionExiste(): boolean {
    let sesionActual = this.getDatosSesion();
    return (sesionActual) ? true : false;
  }
  /**
   * Obtiene los datos de la sesion activa en el local storage
   * @returns
   */
  getDatosSesion(){
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual;
  }
}
