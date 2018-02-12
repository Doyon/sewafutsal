import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthProvider {

  constructor(public http: Http, public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
    
  }

  loginUser(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signupUser(nama: string ,email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      this.afDatabase.object(`/userProfile/${newUser.uid}`).set({
          userid: newUser.uid,
          email: email,
          nama: nama
      });
    });
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }

}