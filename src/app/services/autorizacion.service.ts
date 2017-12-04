import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth/auth';
import { Router } from '@angular/router'
import swal from 'sweetalert2';
import * as firebase from 'firebase/app'

@Injectable()
export class AutorizacionService{
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.isLogged()
  }
  public facebookLogin(){
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((result)=>{
        swal('Genial!', 'Usuario Logeado con Facebook', 'success')
        this.router.navigate(['lugares'])
      }) .catch((error)=>{
        console.log(error)
      })
  }
  public login = (email, password) => {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((response)=> {
        swal('Genial!', 'Usuario Registrado con éxito', 'success')
        this.router.navigate(['lugares'])
      }) .catch((error)=>{
        swal('Ops...', 'Ha ocurrido un error', 'error')
      })
  }
  public registro = (email, password) => {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response)=> {
        swal('Genial!', 'Usuario Registrado con éxito', 'success')
        this.router.navigate(['lugares'])
      }) .catch((error)=>{
        swal('Ops...', 'Ha ocurrido un error', 'error')
      })
  }
  public isLogged(){
    return this.angularFireAuth.authState
  }
  public logout(){
    this.angularFireAuth.auth.signOut()
    swal('Adios 😢', 'Sesión Cerrada', 'success')
    this.router.navigate(['lugares'])
  }
}
