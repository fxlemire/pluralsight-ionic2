import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApi } from '../../shared/shared';
import { TeamHomePage } from '../pages';

@Component({
  selector: 'page-game',
  templateUrl: 'game.page.html'
})
export class GamePage {
  game: any;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public eliteApi: EliteApi) {
    this.game = this.navParams.data;
  }

  teamTapped(teamId) {
    const tournamentData = this.eliteApi.getCurrentTournament();
    const team = tournamentData.teams.find(t => t.id === teamId);

    this.navCtrl.push(TeamHomePage, team);
  }
}
