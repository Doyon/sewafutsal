import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ModalController, AlertController, LoadingController,
  ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Toast } from 'ionic-angular/components/toast/toast';
import { ServicesProvider } from '../../providers/services/services';

@Component({
  selector: 'page-detaillapangan',
  templateUrl: 'detaillapangan.html',
})
export class DetaillapanganPage {

  namaLapangan: any;
  tanggal: any;
  user: any;
  time: any;
  date: any;
  pesanan: Observable<any>;
  idLap: any;
  lap: any;
  telp: any;
  waktu: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
  private storage: Storage, private nativeStorage: NativeStorage, private datePicker: DatePicker, 
  public modalCtrl: ModalController, public afDB: AngularFireDatabase, public alertCtrl: AlertController,
  public loadingCtrl: LoadingController, public toastCtrl: ToastController, public services: ServicesProvider) {
    this.services.loadUserProfile();
    this.lap = {
      nama: this.navParams.get('nama'),
      harga1: this.navParams.get('harga1'),
      harga2: this.navParams.get('harga2'),
      jenis: this.navParams.get('jenis'),
      photo: this.navParams.get('photo')
    }

    console.log(this.lap.jenis);

    this.pesanan = this.afDB.list('/lap/' + this.lap.jenis + '/pesanan/').valueChanges();
    this.pesanan.subscribe(pesan => {
      this.waktu = pesan
    });

    this.afDB.list('/admin').valueChanges().subscribe( admin => {
      this.telp = admin[1];
    });

    if(this.platform.is('cordova')){
      this.nativeStorage.getItem('currentUser').then(user => {
        this.user = user;
      });
    } else {
      this.storage.get('currentUser').then(user => {
        this.user = user;
      });
    }
  }

  validasi(){
    let cek = true;
    this.waktu.forEach(element => {
      if(element.waktu == this.time && element.tanggal == this.date){
        cek = false
      }
    });

    return cek;
  }

  pesan(){
    if(this.time == null || this.date == null){
      this.alertNotNull()
    } else {
      this.showConfirm()
    }
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Pesan Lapangan',
      message: 'Apakah anda yakin ingin memesan??',
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
            if(!this.validasi()){
              this.alertWaktuSama()
            } else {
              this.sewa()
            }
          }
        }
      ]
    });
    confirm.present();
  }

  sewa(){
    let loader = this.loadingCtrl.create({
      content: "Tunggu Sebentar..."
    });
    loader.present().then(() => {
      this.afDB.object(`/lap/${this.lap.jenis}/pesanan/${this.user.userid}`).set({
        userid: this.user.userid,
        pemesan: this.user.nama,
        waktu: this.time,
        tanggal: this.date
      }).catch(e => console.log(e));
      loader.dismiss();
      this.showAlert();
    });
  }

  alertWaktuSama(){
    let alert = this.alertCtrl.create({
      subTitle: 'Waktu yang anda pilih sudah dipesan, silahkan pilih waktu yang lain',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }

  alertNotNull(){
    let alert = this.alertCtrl.create({
      subTitle: 'Waktu atau tanggal tidak boleh kosong',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      subTitle: 'Pesan berhasil, mohon segera menghubungi nomor admin '+this.telp,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Pesan Berhasil',
      duration: 3000
    });
    toast.present();
  }
}
