import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database/database";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
@Injectable()
export class LugaresService{
  API_ENDPOINT = 'https://ngsquare-1e245.firebaseio.com';
  lugares:any = [];
  
  constructor(private afDB:AngularFireDatabase, private http: Http){}
  public getLugares(){
    return this.afDB.list('lugares/');
    /*return this.http.get(this.API_ENDPOINT+'/.json')
        .map((resultado)=>{
            const data = resultado.json().lugares;
            return data;
        })*/
  }
  public buscarLugar(id){
    return this.lugares.filter((lugar) => { return lugar.id == id})[0] || null;
  }
  public guardarLugar(lugar){
    this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
    //const headers = new Headers({"Content-Type":"application/json"});
    //return this.http.post(this.API_ENDPOINT+'/lugares.json', lugar, {headers:headers});
  }
  public editarLugar(lugar){
    this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
  }
  public obtenerGeoData(direccion){
    //http://maps.google.com/maps/api/geocode/json?address=9-55+calle+72,+Bogota,Colombia
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address='+direccion);
  }
  public getLugar(id){
    return this.afDB.object('lugares/'+id);
  }
}
