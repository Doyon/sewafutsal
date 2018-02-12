import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the FasilitasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-fasilitas',
  templateUrl: 'fasilitas.html',
})
export class FasilitasPage {

  fasilitas: Array<any> = new Array;

  constructor(public navCtrl: NavController, public navParams: NavParams, public services: ServicesProvider) {
    this.fasilitas = [
      {
        title: 'Kursi Penonton',
        image: 'https://lapanganfutsal.id/wp-content/uploads/2017/08/tomot-futsal-lapangan-futsal-pekanbaru-c-372x240.jpg'
      },
      {
        title: 'Parkir',
        image: 'http://padangkita.com/padangkita/uploads/2017/08/Parkir-UMM.ac_.id_.jpg'
      },
      {
        title: 'Mushola',
        image: 'http://infobisnisproperti.com/wp-content/uploads/2015/10/Model-Mushola-Minimalis.jpg'
      },
      {
        title: 'Ruang Ganti',
        image: 'http://4.bp.blogspot.com/-aQdb_Jrhj-s/Ua2EIF7aGDI/AAAAAAAAAE8/UTPEwVupclg/s1600/ruang-ganti-futsal.jpg'
      },
      {
        title: 'Ruang Bilas',
        image: 'http://3.bp.blogspot.com/-0NBZoFJBmaA/VqNj068vLGI/AAAAAAAABOU/BrB1ao-RLf8/s1600/Kolam%2BRenang%2BCemara%2BAsri%2BMedan%2B%2528Ruang%2BBilas%2529.jpg'
      },
      {
        title: 'Kamar Mandi',
        image: 'http://livedesain.com/wp-content/uploads/2017/08/Kamar-Mandi-Sederhana-Dengan-Kloset-Jongkok-Baru.jpg'
      },
      {
        title: 'Kulkas Minuman',
        image: 'http://www.alatkesehatan.id/wp-content/uploads/2016/05/GM-EXPO230X.jpg'
      },
      {
        title: 'Air Galon Gratis',
        image: 'https://i5.walmartimages.com/asr/d1e8bb67-5e8c-4322-bec3-6cf3fe3d0be4_1.4a130dabeb0f5b70cc9a993f4d45e6ff.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FasilitasPage');
  }

  // menuToogle(){
  //   this.services.loadUserProfile();
  // }
}
