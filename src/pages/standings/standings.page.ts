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
  divisionFilter = 'division';
  standings: any[];
  team: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public eliteApi: EliteApi) {}

  ionViewDidLoad() {
    this.team = this.navParams.data;
    const tournamentData = this.eliteApi.getCurrentTournament();
    this.standings = tournamentData.standings;
    this.allStandings = tournamentData.standings;

    this.filterDivision();
  }

  getHeader(record, recordIndex, records) {
    let division = null;

    if (recordIndex === 0 || record.division !== records[recordIndex - 1].division) {
      division = record.division;
    }

    return division;
  }

  filterDivision() {
    if (this.divisionFilter === 'all') {
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }
}
