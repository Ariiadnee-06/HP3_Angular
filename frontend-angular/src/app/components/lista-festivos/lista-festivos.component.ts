import { Component, OnInit } from '@angular/core';
import { FestivoService } from 'src/app/services/festivo.service';
import { Festivo } from 'src/app/models/festivo.model';

@Component({
  selector: 'app-lista-festivos',
  imports: [],
  templateUrl: './lista-festivos.component.html',
  styleUrl: './lista-festivos.component.css'
})
export class ListaFestivosComponent {
   festivos: Festivo[] = [];

  constructor(private festivoService: FestivoService) {}

  ngOnInit(): void {
    this.festivoService.obtenerFestivos().subscribe(data => {
      this.festivos = data;
    });
  }
}

