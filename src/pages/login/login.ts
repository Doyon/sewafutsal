import { Component } from '@angular/core';
import { IonicPage,
  NavController,
  Loading,
  LoadingController,
  AlertController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ResetpassPage } from '../resetpass/resetpass';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { ServicesProvider } from '../../providers/services/services';
import { LoginadminPage } from '../loginadmin/loginadmin';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  public loginForm:FormGroup;  
  public loading:Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public formBuilder: FormBuilder, private storage: Storage,
    public authProvider: AuthProvider, public platform: Platform, private nativeStorage: NativeStorage,
    public services: ServicesProvider) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(HomePage);
        });
      }, error => {
        this.loading.dismiss().then( () => {
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
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

  goToResetPassword(){
    this.navCtrl.push(ResetpassPage);
  }

  goToAdmin(){
    this.navCtrl.push(LoginadminPage);
  }
}
