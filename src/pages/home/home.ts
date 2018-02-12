import { Component } from '@angular/core';
import { NavController, Platform  } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import { ServicesProvider } from '../../providers/services/services';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { DetaillapanganPage } from '../detaillapangan/detaillapangan';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lapangan: Observable<any[]>;
  namaUser: any;
  profil: any;

  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase, 
    public authProvider: AuthProvider, public services: ServicesProvider, public platform: Platform,
  private nativeStorage: NativeStorage, private storage: Storage) {
      
    // this.services.loadUserProfile();
    this.lapangan = this.afDB.list('/lap').valueChanges();

    // this.lapangan = services.loadLapangan();
    const authObserver = this.services.loadUserEmail().subscribe(user => {
      if (!user) { 
        this.navCtrl.setRoot(LoginPage);
        // authObserver.unsubscribe();
      } else {
        if(this.platform.is('cordova')){
          this.nativeStorage.setItem('userUid', user.uid);
          this.namaUser = user.email;
          this.services.loadUserProfile();
        } else {
          this.storage.set('userUid', user.uid);
          this.namaUser = user.email;
          this.services.loadUserProfile();
        }
        // authObserver.unsubscribe();
      }
    });
  }

  menuToogle(){
    this.services.loadUserProfile();
  }

  detailLapangan(lap){
    this.navCtrl.push(DetaillapanganPage, lap);
  }
}
