import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AutorizacionService } from './services/autorizacion.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;
  constructor(private autorizacionService: AutorizacionService) {
    this.autorizacionService.isLogged()
      .subscribe((result)=>{
        if(result && result.uid) {
          this.loggedIn = true
        } else {
          this.loggedIn = false
        }
      }, (error)=>{
        this.loggedIn = false
      })
  }
  logout(){
    this.autorizacionService.logout()
  }
}
