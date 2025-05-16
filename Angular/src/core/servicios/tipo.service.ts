import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}tipo/`;
  }

  }
}
