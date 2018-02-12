import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { LapanganPage } from '../pages/lapangan/lapangan';

import { ServicesProvider } from '../providers/services/services';
import { AuthProvider } from '../providers/auth/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFireDatabase } from 'angularfire2/database';
import { MapPage } from '../pages/map/map';
import { FasilitasPage } from '../pages/fasilitas/fasilitas';
import { TentangPage } from '../pages/tentang/tentang';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, icon: String}>;
  users: any;
  status: any;
  servis: any;
  nama: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public afAuth: AngularFireAuth, public services: ServicesProvider, public authProvider: AuthProvider, public alertCtrl: AlertController, 
public db: AngularFireDatabase) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Beranda', icon: 'home' },
      { title: 'Fasilitas', icon: 'football'},
      { title: 'Peta', icon: 'map'},
      { title: 'Tentang', icon: 'information-circle'},
      { title: 'Keluar', icon: 'exit'}
    ];

  //Check if there is a user or not 
  this.db.list('admin').valueChanges().subscribe(email => {
    console.log(email[0]);
    const authObserver = this.afAuth.authState.subscribe(user => {
      if (!user) { 
        //go to LoginPage
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      } else if (user.email != email[0]){
        //go to HomePage
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else if (user.email == email[0]){
        this.rootPage = LapanganPage;
        authObserver.unsubscribe();
      }
    });
  });
}

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Keluar Akun',
      message: 'Apakah anda yakin ingin keluar??',
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            this.authProvider.logoutUser().then( () => {
              this.nav.setRoot(LoginPage);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
  
      if(page.title == 'Beranda'){
        this.nav.setRoot(HomePage);
      } else  if (page.title == 'Keluar'){
        this.showConfirm();
      } else if (page.title == 'Peta'){
        this.nav.setRoot(MapPage);
      } else if (page.title == 'Fasilitas'){
        this.nav.setRoot(FasilitasPage);
      } else if (page.title == 'Tentang'){
        this.nav.setRoot(TentangPage);
      }
  }
}
