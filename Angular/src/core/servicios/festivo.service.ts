import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Campeonato } from '../../shared/entidades/festivos';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

 
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

  public modificar(Festivo: Campeonato): Observable<Festivo> {
    return this.http.put<Campeonato>(`${this.url}modificar`, Festivo);
  }

  public eliminar(id:number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${id}`);
  }

}
