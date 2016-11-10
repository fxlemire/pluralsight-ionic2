import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApi } from '../../shared/shared';

import _ from 'lodash';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.page.html'
})
export class StandingsPage {
  allStandings: any[];
  standings: any[];
  team: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApi) {}

    ionViewDidLoad() {
      this.team = this.navParams.data;
      const tournamentData = this.eliteApi.getCurrentTournament();
      this.standings = tournamentData.standings;

      this.allStandings = _.chain(this.standings)
        .groupBy('division')
        .toPairs()
        .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
        .value();

      console.log(this.standings);
      console.log(this.allStandings);
    }
}
