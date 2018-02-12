import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public services: ServicesProvider,
    private geolocation: Geolocation) {
  }

  ionViewDidEnter() {
    this.initMap();
  }

  initMap() {

    let options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(options).then((resp) => {
      
      let directionsDisplay = new google.maps.DirectionsRenderer();
      let directionsService = new google.maps.DirectionsService();

      let curPos = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let curFutsal = new google.maps.LatLng(-6.6484, 110.7101609);

      let request = {
        origin: curPos,
        destination: curFutsal,
        travelMode: 'DRIVING'
      };

      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(result);
        }
      });

      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: curPos
      });

      directionsDisplay.setMap(map);

      // let marker = new google.maps.Marker({
      //   position: curPos,
      //   map: map
      // });
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    
  }

  // menuToogle(){
  //   this.services.loadUserProfile();
  // }
}
