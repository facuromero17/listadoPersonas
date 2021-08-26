import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggingService } from '../../LoggingService.service';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [LoggingService],
})
export class FormularioComponent implements OnInit {
  nombreInput:string;
  apellidoInput:string;
  index:number;
  modoEdicion:number;

  constructor(
    private loggingService: LoggingService,
    private personasService: PersonasService,
    private router: Router,
    private route:ActivatedRoute
  ) {
    
  }
  ngOnInit(): void {
   this.index = this.route.snapshot.params['id']
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];
   if(this.modoEdicion != null && this.modoEdicion == 1){
     let persona: Persona = this.personasService.encontrarPersona(this.index);
     this.nombreInput = persona.nombre;
     this.apellidoInput = persona.apellido;
    }
  }

  onGuardarPersona() {
    if(this.nombreInput != null && this.apellidoInput != null){
      let persona1:Persona = new Persona(this.nombreInput, this.apellidoInput);
      if(this.modoEdicion!= null && this.modoEdicion == 1){
        this.personasService.modificarPersona(this.index, persona1);
      }
      else{
        this.personasService.agregarPersna(persona1);
      }
      this.loggingService.enviaMensajeAConsola("persona agregada/modificada:" + persona1.toString());
      this.router.navigate(['personas']);  
    }
    else{//si no tiene datos no hace nada se queda en el mismo lugar
      return;
    }
  }

  eliminarPersona(){
    if(this. index != null){
      this.personasService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);
  }
}
