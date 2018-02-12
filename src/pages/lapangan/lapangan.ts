import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-lapangan',
  templateUrl: 'lapangan.html',
})
export class LapanganPage {

  pesanan: Observable<any>;    alamatLap: any;       pemilik: any;
  orderan: any;                 harga1: any;          photo: any;
  lapangan: Observable<any>;    harga2: any;          hapusOrder: any;
  futsal: any;                  latitude: any;        lapanganSeg: any;
  namaLap: any;                 longitude: any;       orderan2: any;
  hapusOrder2: any;
  pesanan2: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public services: ServicesProvider,
  public platform: Platform, private storage: Storage, private nativeStorage: NativeStorage,
  public db: AngularFireDatabase, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
public authProvider: AuthProvider) {

    this.lapanganSeg = 'lapangan1';

    this.hapusOrder = this.db.list('/lap/lapangan1/pesanan');
    this.pesanan = this.db.list('/lap/lapangan1/pesanan').valueChanges();
    this.pesanan.subscribe(pesan => {
      this.orderan = pesan;
    });

    this.hapusOrder2 = this.db.list('/lap/lapangan2/pesanan');
    this.pesanan2 = this.db.list('/lap/lapangan2/pesanan').valueChanges();
    this.pesanan2.subscribe(pesan => {
      this.orderan2 = pesan;
    });
  }

  keluar(){
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  hapus(order) {
    let confirm = this.alertCtrl.create({
      title: 'Hapus Pesanan',
      message: 'Apakah anda yakin ingin menghapus pesanan ini?',
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
            let loader = this.loadingCtrl.create({
              content: "Mohon Tunggu . . ."
            });
            loader.present().then(() => {
              this.hapusOrder.remove(order.userid);
              loader.dismiss();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  hapus2(order2) {
    let confirm = this.alertCtrl.create({
      title: 'Hapus Pesanan',
      message: 'Apakah anda yakin ingin menghapus pesanan ini?',
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
            let loader = this.loadingCtrl.create({
              content: "Mohon Tunggu . . ."
            });
            loader.present().then(() => {
              this.hapusOrder2.remove(order2.userid);
              loader.dismiss();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Keluar Dari Admin',
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
            this.keluar();
          }
        }
      ]
    });
    confirm.present();
  }
}
