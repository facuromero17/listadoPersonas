import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from '../LoggingService.service';
import { Persona } from '../persona.model';
import { PersonasService } from '../personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent implements OnInit {
  personas: Persona[] = [];

  constructor(
    private personasService: PersonasService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.personasService.obtenerPersonas()
      .subscribe(
        (personas: Persona[]) => {
          //Cargamos los datos de la base de datos al arreglo de personas local 
          this.personas = personas;
          this.personasService.setPersonas(this.personas);
          console.log("obtener personas suscriber:" + this.personas);
        }
      );
  }
  agregar() {
    this.router.navigate(['personas/agregar'], {queryParams:{modoEdicion:0}});
  }
}
