import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.page.html'
})
export class TeamsPage {
  teams = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApi) {}

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

  ionViewDidLoad() {
    const selectedTournament = this.navParams.data;

    this.eliteApi.getTournamentData(selectedTournament.id).subscribe(data => {
      this.teams = data.teams;
    });
  }
}
