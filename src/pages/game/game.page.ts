import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApi } from '../../shared/shared';
import { MapPage, TeamHomePage } from '../pages';

declare var window: any;

@Component({
  selector: 'page-game',
  templateUrl: 'game.page.html'
})
export class GamePage {
  game: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public eliteApi: EliteApi) {
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId) {
    const tournamentData = this.eliteApi.getCurrentTournament();
    const team = tournamentData.teams.find(t => t.id === teamId);

    this.navCtrl.push(TeamHomePage, team);
  }

  goToDirections() {
    const tournamentData = this.eliteApi.getCurrentTournament();
    const location = tournamentData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goToMap() {
    this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2);
  }
}
