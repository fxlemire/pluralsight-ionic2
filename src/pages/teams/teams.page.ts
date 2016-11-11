import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';

import _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.page.html'
})
export class TeamsPage {
  private allTeams: any;
  private allTeamDivisions: any;
  queryText: string = '';
  teams = [];

  constructor(
      public loadingCtrl: LoadingController,
      public navCtrl: NavController,
      public navParams: NavParams,
      public eliteApi: EliteApi) {}

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

  ionViewDidLoad() {
    const selectedTournament = this.navParams.data;

    const loader = this.loadingCtrl.create({
      content: 'Getting data...'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTournament.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions = _.chain(this.allTeams)
          .groupBy('division')
          .toPairs()
          .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
          .value();
        this.teams = this.allTeamDivisions;
      });

      loader.dismiss();
    });
  }

  updateTeams() {
    const queryTextLower = this.queryText.toLowerCase();
    const filteredTeams = [];

    _.forEach(this.allTeamDivisions, td => {
      const teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));

      if (teams.length) {
        filteredTeams.push({
          divisionName: td.divisionName,
          divisionTeams: teams
        });
      }
    });

    this.teams = filteredTeams;
  }
}
