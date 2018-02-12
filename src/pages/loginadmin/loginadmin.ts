import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LapanganPage } from '../lapangan/lapangan';
import { Platform } from 'ionic-angular/platform/platform';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the LoginadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginadmin',
  templateUrl: 'loginadmin.html',
})
export class LoginadminPage {

  public adminForm: FormGroup;
  loading: any;
  admin: Observable<any>;
  mimin: any;  

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
  public loadingCtrl: LoadingController, public db: AngularFireDatabase, public toastCtrl: ToastController,
public platform: Platform, private native: NativeStorage, private storage: Storage, public authProvider: AuthProvider,
public alertCtrl: AlertController) {
    this.adminForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.db.list('/admin').valueChanges().subscribe(min => {
      this.mimin = min;
    });
  }

  loginAdmin(){
    if (!this.adminForm.valid){
      console.log(this.adminForm.value);
    } else { 
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.authProvider.loginUser(this.adminForm.value.email, this.adminForm.value.password)
      .then( authData => {
        this.navCtrl.setRoot(LapanganPage);
        this.loading.dismiss();
      }, error => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present(); 
        this.loading.dismiss();
      });

      this.loading.dismiss();
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Username atau Password Salah!',
      duration: 3000
    });
    toast.present();
  }
}
