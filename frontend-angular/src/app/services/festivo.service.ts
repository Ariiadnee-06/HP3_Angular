import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Festivo } from '../models/festivo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FestivoService {
  private apiUrl = 'https://localhost:5001/api/festivos'; // tu API en C#

  constructor(private http: HttpClient) {}

  obtenerFestivos(): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(this.apiUrl);
  }
}
