import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
  public alertCtrl: AlertController, public formBuilder: FormBuilder, 
  public authProvider: AuthProvider, public platform: Platform, private nativeStorage: NativeStorage,
  private storage: Storage) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      username: ['', Validators.compose([Validators.maxLength(100), Validators.required])]
    });
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(this.signupForm.value.username, this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(LoginPage);
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [{ text: "Ok", role: 'cancel' }]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
