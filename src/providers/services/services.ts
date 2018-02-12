import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class ServicesProvider {

    lapangan: Observable<any[]>;
    user: Observable<any[]>;
    tes: any;

    constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase,
        private nativeStorage: NativeStorage, public platform: Platform, private storage: Storage) {
        
    }

    loadUserEmail(){
        return this.afAuth.authState;
    }

    loadUserProfile(){
        const profil = this.afDatabase.list('/userProfile').valueChanges().subscribe(profile => {
            
            if(this.platform.is('cordova')){
                this.nativeStorage.setItem('profile', profile);
            } else {
                this.storage.set('profile', profile);
            }
            this.updateUser();
            profil.unsubscribe();
        }); 
    }

    updateUser(){
        if(this.platform.is('cordova')){
            this.nativeStorage.getItem('userUid').then(uid => {
                this.nativeStorage.getItem('profile').then(profile => {
                  profile.forEach(element => {
                      if(uid == element.userid){
                        this.nativeStorage.setItem('currentUser', element);
                      }
                  });
                });
            });
        } else {
            this.storage.get('userUid').then(uid => {
                this.storage.get('profile').then(profile => {
                  profile.forEach(element => {
                      if(uid == element.userid){
                        console.log(element);
                        this.storage.set('currentUser', element);
                      }
                  });
                });
            });
        }
        
    }
}