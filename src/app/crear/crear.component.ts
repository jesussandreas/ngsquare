import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  lugar:any = {};
  id:any = null;
  results$: Observable<any>;
  private searchField: FormControl;
  constructor(private lugaresService: LugaresService, private route: ActivatedRoute, private http: Http){
    this.id = this.route.snapshot.params['id'];
    if (this.id != 'new'){
      this.lugaresService.getLugar(this.id)
        .valueChanges().subscribe(lugar => {
          this.lugar = lugar;
      });
    }
    const URL = 'https://maps.google.com/maps/api/geocode/json';
    this.searchField = new FormControl();
    this.results$ = this.searchField.valueChanges
      .debounceTime(500)
      .switchMap(query => this.http.get(`${URL}?address=${query}`))
      .map(response => response.json())
      .map(response => response.results);
  }
  seleccionarDireccion(direccion){
    console.log(direccion);
    this.lugar.calle = direccion.address_components[1].long_name+' '+direccion.address_components[0].long_name;
    this.lugar.ciudad = direccion.address_components[4].long_name;
    this.lugar.pais = direccion.address_components[6].long_name;
  }
  guardarLugar(){
    var direccion = this.lugar.calle+','+this.lugar.ciudad+','+this.lugar.pais;
    this.lugaresService.obtenerGeoData(direccion)
        .subscribe((result) => {
            this.lugar.lat = result.json().results[0].geometry.location.lat;
            this.lugar.lng = result.json().results[0].geometry.location.lng;

            if (this.id != 'new'){
              this.lugaresService.editarLugar(this.lugar)
              history.back()
              swal({
                title: '¡Listo!',
                text: 'Editado con éxito, Volviendo a inicio.',
                type: 'success',
                showConfirmButton: false,
                timer: 1500
              })
            } else {
              this.lugar.id = Date.now()
              this.lugaresService.guardarLugar(this.lugar)
              swal({
                title: '¡Nuevo lugar!',
                text: 'Creado con éxito, ¿Desea crear otro?',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, Crear otro!'
              }).then((result) => {
                if (result.value) {}
                else {
                  history.back()
                  swal({
                    type: 'success',
                    title: '¡Genial!',
                    text: 'Volviendo a inicio.',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
              })
            }
            this.lugar = {};
        });
  }
}
