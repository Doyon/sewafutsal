import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { DatePicker } from '@ionic-native/date-picker';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetpassPage } from '../pages/resetpass/resetpass';
import { LapanganPage } from '../pages/lapangan/lapangan';
import { DetaillapanganPage } from '../pages/detaillapangan/detaillapangan';
import { LoginadminPage } from '../pages/loginadmin/loginadmin';
import { MapPage } from '../pages/map/map';
import { FasilitasPage } from '../pages/fasilitas/fasilitas';
import { TentangPage } from '../pages/tentang/tentang';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthProvider } from '../providers/auth/auth';
import { ServicesProvider } from '../providers/services/services';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';

//firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyDUkVz5uJnVcGoyxOdn9BB6y8qyqrfo5r8",
  authDomain: "griya-futsal.firebaseapp.com",
  databaseURL: "https://griya-futsal.firebaseio.com",
  projectId: "griya-futsal",
  storageBucket: "griya-futsal.appspot.com",
  messagingSenderId: "506862936426"
};

// export const firebaseConfig = {
//   apiKey: "AIzaSyD29WDjipknFjSm7jxiH4g9QRQyNB3MHwA",
//   authDomain: "sewafutsal.firebaseapp.com",
//   databaseURL: "https://sewafutsal.firebaseio.com",
//   projectId: "sewafutsal",
//   storageBucket: "sewafutsal.appspot.com",
//   messagingSenderId: "1043487953968"
// };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetpassPage,
    LapanganPage,
    DetaillapanganPage,
    LoginadminPage,
    MapPage,
    FasilitasPage,
    TentangPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetpassPage,
    LapanganPage,
    DetaillapanganPage,
    LoginadminPage,
    MapPage,
    FasilitasPage,
    TentangPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    ServicesProvider,
    AngularFireDatabase,
    Camera,
    NativeStorage,
    FileChooser,
    DatePicker,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
