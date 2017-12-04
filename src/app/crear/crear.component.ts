import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  lugar:any = {};
  id:any = null;
  constructor(private lugaresService: LugaresService, private route: ActivatedRoute){
    this.id = this.route.snapshot.params['id'];
    if (this.id != 'new'){
      this.lugaresService.getLugar(this.id)
        .valueChanges().subscribe(lugar => {
          this.lugar = lugar;
      });
    }
  }
  guardarLugar(){
    var direccion = this.lugar.calle+','+this.lugar.ciudad+','+this.lugar.pais;
    this.lugaresService.obtenerGeoData(direccion)
        .subscribe((result) => {
            this.lugar.lat = result.json().results[0].geometry.location.lat;
            this.lugar.lng = result.json().results[0].geometry.location.lng;

            if (this.id != 'new'){
              this.lugaresService.editarLugar(this.lugar)
              swal({
                title: '¡Listo!',
                text: 'Editado con éxito!, ¿Desea crear otro?',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, Crear otro!'
              }).then((result) => {
                if (result.value) {}
                else {
                  history.back(1)
                  swal({
                    type: 'success',
                    title: 'Perfecto!',
                    text: 'Volviendo a inicio.',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
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
                  history.back(1)
                  swal({
                    type: 'success',
                    title: 'Perfecto!',
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
