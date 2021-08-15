import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoggingService } from '../LoggingService.service';
import { Persona } from '../persona.model';
import { PersonasService } from '../personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [LoggingService],
})
export class FormularioComponent {
  nombreInput:string;
  apellidoInput:string;
  

  constructor(
    private loggingService: LoggingService,
    private personasService: PersonasService
  ) {
    this.personasService.saludar.subscribe((indice: number) =>
      alert('el indice es:' + indice)
    );
  }

  agregarPersona() {
    let persona1 = new Persona(
      this.nombreInput,
      this.apellidoInput
    );
    
    this.personasService.agregarPersna(persona1);
  }
}
