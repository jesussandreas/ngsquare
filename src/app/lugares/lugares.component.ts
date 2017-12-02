import { Component } from '@angular/core';
import { LugaresService } from "../services/lugares.service";

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent {
  title = 'NgSquare';

  lat:number = 43.6425662;
  lng:number = -79.3892455,17
  lugares = null;
  constructor(private lugaresService: LugaresService){
    this.lugares = lugaresService.getLugares();
  }
}
