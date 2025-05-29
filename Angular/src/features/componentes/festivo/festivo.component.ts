import { Component, OnInit, ViewChild } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modules/referencias-material.module';
import { festivo } from '../../../shared/entidades/festivo';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { festivoService } from '../../../core/servicios/festivo.service';
import { MatDialog } from '@angular/material/dialog';
import { festivoEditarComponent } from '../festivo-editar/festivo-editar.component';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';
import { FormsModule } from '@angular/forms';
import { Seleccion } from '../../../shared/entidades/festivos';
import { SeleccionService } from '../../../core/servicios/festivos.service';

@Component({
  selector: 'app-festivo',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './festivos.component.html',
  styleUrl: './festivos.component.css'
})
export class festivoComponent implements OnInit {
  @ViewChild(DatatableComponent) tabla!: DatatableComponent;

  public readonly TAMANO: number = 10;

  public opcionBusqueda: number = -1;
  public opcionesBusqueda: string[] = ["Nombre", "Año", "País Organizador"];
  public textoBusqueda: string = "";

  public selecciones: Seleccion[] = [];
  public festivos: festivo[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Año", prop: "año" },
    { name: "País Organizador", prop: "paisOrganizador.nombre" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;
  public festivoEscogido: festivo | undefined;
  public indicefestivoEscogido: number = -1;


  constructor(private serviciofestivo: festivoService,
    private servicioSeleccion: SeleccionService,
    private servicioDialogo: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.listar(-1);
    this.listarSelecciones();
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.festivoEscogido = event.row;
      this.indicefestivoEscogido = this.festivos.findIndex(festivo => festivo == this.festivoEscogido);
    }
  }

  public listarSelecciones() {
    this.servicioSeleccion.listar().subscribe({
      next: response => {
        this.selecciones = response;
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public listar(idBuscado: number) {
    this.serviciofestivo.listar().subscribe({
      next: response => {
        this.festivos = response;
        if (idBuscado > 0) {
          this.indicefestivoEscogido = this.festivos.findIndex(festivo => festivo.id == idBuscado);
          this.festivoEscogido = this.festivos[this.indicefestivoEscogido];
          setTimeout(() => {
            this.tabla.offset = Math.floor(this.indicefestivoEscogido / this.TAMANO);
          });

        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public modificar() {
    if (this.festivoEscogido) {
      this.festivoEscogido.year = this.festivoEscogido.año;
      const dialogo = this.servicioDialogo.open(festivoEditarComponent, {
        width: "500px",
        height: "400px",
        data: {
          encabezado: `Modicando el festivo ${this.festivoEscogido.nombre}`,
          festivo: { ...this.festivoEscogido },
          selecciones: this.selecciones
        },
        disableClose: true,
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            datos.festivo.año = datos.festivo.year;
            this.serviciofestivo.modificar(datos.festivo).subscribe({
              next: response => {
                this.festivos[this.indicefestivoEscogido] = response;
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Debe escoger el festivo a modificar");
    }
  }

  public verificarEliminar() {
    if (this.festivoEscogido) {
      const dialogo = this.servicioDialogo.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `Está seguro de eliminar el festivo ${this.festivoEscogido.nombre} ?`,
          id: this.festivoEscogido.id
        },
        disableClose: true,
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.serviciofestivo.eliminar(datos.id).subscribe({
              next: response => {
                if (response) {
                  this.listar(-1);
                  window.alert("festivo eliminado con éxito");
                } else {
                  window.alert("No se pudo eliminar el festivo");
                }
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Debe escoger el festivo a modificar");
    }
  }

  public buscar() {
    if (this.textoBusqueda.length > 0) {
      this.serviciofestivo.buscar(this.opcionBusqueda, this.textoBusqueda).subscribe(
        {
          next: response => {
            this.festivos = response;
          },
          error: error => {
            window.alert(error.message);
          }
        }
      );
    }
    else {
      this.listar(-1);
    }
  }

  public agregar() {
    const dialogo = this.servicioDialogo.open(festivoEditarComponent, {
      width: "500px",
      height: "400px",
      data: {
        encabezado: "Agregando un nuevo festivo",
        festivo: {
          id: 0,
          nombre: "",
          paisOrganizador: {
            id: 0, nombre: "", entidad: ""
          },
          idSeleccion: 0,
          año: 0,
          year: 0
        },
        selecciones: this.selecciones
      },
      disableClose: true,
    });
    dialogo.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          datos.festivo.año = datos.festivo.year;
          this.serviciofestivo.agregar(datos.festivo).subscribe({
            next: response => {
              this.listar(response.id);
            },
            error: error => {
              window.alert(error.message);
            }
          });
        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }



}

