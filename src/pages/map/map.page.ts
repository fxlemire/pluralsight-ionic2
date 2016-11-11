import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { EliteApi } from '../../shared/shared';

declare var window: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.page.html'
})
export class MapPage {
  map: any;

  constructor(
      public navParams: NavParams,
      public eliteApi: EliteApi) {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    const games = this.navParams.data;
    const tournamentData = this.eliteApi.getCurrentTournament();
    const location = tournamentData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location
    };
  }

  getDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }
}
