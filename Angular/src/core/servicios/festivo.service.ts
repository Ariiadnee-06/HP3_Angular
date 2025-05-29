import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { festivo } from '../../shared/entidades/festivos';

@Injectable({
  providedIn: 'root'
})
export class festivoService {

 
  private url: string;
  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}festivo/`;
  }

  public listar(): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}listar`);
  }

  public buscar(opcion:number, dato:string): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}buscar/${opcion}/${dato}`);
  }

  public agregar(Festivo: Festivo): Observable<Festivo> {
    return this.http.post<Festivo>(`${this.url}agregar`, Festivo);
  }

  public modificar(Festivo: festivo): Observable<Festivo> {
    return this.http.put<festivo>(`${this.url}modificar`, Festivo);
  }

  public eliminar(id:number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${id}`);
  }

}
