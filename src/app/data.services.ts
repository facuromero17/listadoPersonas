import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from './persona.model';

@Injectable()
export class DataServices {
  constructor(private httpClient: HttpClient) {}

  //cargar personas
  cargarPersonas():Observable<any> {
    
    return this.httpClient.get('https://listadopersonas-bd844-default-rtdb.firebaseio.com/datos.json');
  }
  //guardar personas
  guardarPersonas(personas: Persona[]) {
    this.httpClient
      .put(
        'https://listadopersonas-bd844-default-rtdb.firebaseio.com/datos.json',
        personas
      )
      .subscribe(
        (response) =>{
          console.log('resultado de guardar las personas' + response)},
        (error) => console.log('error al guardar personas' + error)
      );
  }

  modificarPersona(index: number, persona: Persona) {
    let url: string;
    url =
      'https://listadopersonas-bd844-default-rtdb.firebaseio.com' + '/datos/' + index +'.json';
      console.log("url de modificar persona" + url)
    this.httpClient.put(url, persona).subscribe(
      (response) => {console.log('resultado modificar persona:' + response)},
      (error) => console.log('error en modificar la persona' + error)
    );
  }

  eliminarPersona(index: number) {
    let url: string;
    url =
      'https://listadopersonas-bd844-default-rtdb.firebaseio.com' + '/datos/' +
      (index) +
      '.json';
    this.httpClient.delete(url).subscribe(
      (response) => console.log('resultado eliminar persona:' + response),
      (error) => console.log('error en eliminar la persona' + error)
    );
  }
}
