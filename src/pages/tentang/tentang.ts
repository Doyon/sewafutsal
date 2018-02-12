import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the TentangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tentang',
  templateUrl: 'tentang.html',
})
export class TentangPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public services: ServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TentangPage');
  }

  // menuToogle(){
  //   this.services.loadUserProfile();
  // }
}
