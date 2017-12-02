import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database';
import { Http } from '@angular/http';

@Injectable()
export class LugaresService {
  lugares:any = [
    { id: 1, plan: 'pay', cercania: 2, distancia: 2, active: true, name:'CN Tower', description: 'Descripcion' },
    { id: 2, plan: 'free', cercania: 2, distancia: 5, active: true, name:'Rogers Center', description: 'Descripcion' },
    { id: 3, plan: 'free', cercania: 3, distancia: 9, active: false, name:'Toronto Marriot', description: 'Descripcion' },
    { id: 4, plan: 'pay', cercania: 1, distancia: 1, active: true, name:'Starbucks', description: 'Descripcion' },
    { id: 5, plan: 'pay', cercania: 1, distancia: 1, active: true, name:'Niagara Falls', description: 'Descripcion' },
    { id: 6, plan: 'pay', cercania: 1, distancia: 1, active: true, name:'Airport', description: 'Descripcion' }
  ];
  constructor(private afDB:AngularFireDatabase, private http: Http) {}
  public getLugares(){
    return this.afDB.list('lugares/')
  }
  public buscarLugar(id){
    return this.lugares.filter((lugar) => { return lugar.id == id})[0] || null;
  }
  public guardarLugar(lugar) {
    console.log(lugar)
    this.afDB.database.ref('lugares/'+lugar.id).set(lugar)
  }
  public obtenerGeoData(direccion){
     //http://maps.google.com/maps/api/geocode/json?address=9-55+calle+72,+Bogota,Colombia
     return this.http.get('http://maps.google.com/maps/api/geocode/json?address='+direccion);
   }
}
