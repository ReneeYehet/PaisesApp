import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = "";
  hayError: boolean = false;
  paises: Country[] = [];
  capitalesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService ) { }

  buscar( termino: string ) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;

    this.paisService.buscarCapital( this.termino )
      .subscribe(
        (paises) => {
          console.log(paises);
          this.paises = paises;
        },
        (error) => {
          this.hayError = true;
          this.paises = [];
        });
  }

  sugerencias( termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarCapital( termino )
      .subscribe( 
        paises => this.capitalesSugeridos = paises.splice(0,5),
        (err) => this.capitalesSugeridos = []
      );
  }

  buscarSugerencias( termino: string ) {
    this.buscar( termino );
  }

}
