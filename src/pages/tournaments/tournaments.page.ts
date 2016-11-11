import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { MyTeamsPage, TeamsPage } from '../pages';

import { EliteApi } from '../../shared/shared';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.page.html'
})
export class TournamentsPage {
  tournaments: any;

  constructor(
      public navCtrl: NavController,
      public eliteApi: EliteApi,
      public loadingCtrl: LoadingController) {}

  itemTapped($event, tournament) {
    this.navCtrl.push(TeamsPage, tournament);
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: 'Getting tournaments...'
      // spinner: 'dots'
    });

    loader.present().then(() => {
      this.eliteApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      })
    });
  }
}
