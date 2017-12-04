import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import swal from 'sweetalert2';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css'],
  animations: [
    trigger('contenedorAnimable', [
      state('inicial', style({
          opacity: 0
      })),
      state('final', style({
          opacity: 1
      })),
      transition('inicial => final', animate(2000)),
      transition('final => inicial', animate(1000)),
    ])
  ]
})
export class LugaresComponent {
  title = 'NgSquare';
  state = 'inicial';

  lat:number = 43.6425662;
  lng:number = -79.3892455,17;
  lugares = null;
  animar(){
    this.state = (this.state === 'final') ? 'inicial' : 'final';
  }
  animacionInicia(e){
    console.log('Iniciado!');
    console.log(e);
  }
  animacionTermina(e){
    console.log('Terminado!');
    console.log(e);
  }
  constructor(private lugaresService: LugaresService){
    lugaresService.getLugares()
      .valueChanges().subscribe(lugares =>{
        this.lugares = lugares;
        var me = this;
        me.lugares = Object.keys(me.lugares).map(function (key) { return me.lugares[key]; });
        this.state = 'final';
      }, error => {
        console.log(error);
        swal(
          'Oops...',
          '¡Algo va mal!',
          'error'
        )
      });
  }
}
