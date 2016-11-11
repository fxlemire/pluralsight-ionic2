import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';

import { GamePage } from '../pages';
import { EliteApi, UserSettings } from '../../shared/shared';

import _ from 'lodash';
import moment from 'moment';


@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.page.html'
})
export class TeamDetailPage {
  allGames: any[];
  dateFilter: string;
  games: any[];
  isFollowing = false;
  team: any;
  teamStanding: any;
  useDateFilter = false;
  private tournamentData: any;

  constructor(
      public alertCtrl: AlertController,
      public navCtrl: NavController,
      public navParams: NavParams,
      public toastCtrl: ToastController,
      public eliteApi: EliteApi,
      public userSettings: UserSettings) {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tournamentData = this.eliteApi.getCurrentTournament();

    this.games = _.chain(this.tournamentData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        const isTeam1 = (g.team1Id === this.team.id);
        const opponentName = isTeam1 ? g.team2 : g.team1;
        const scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);

        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        };
      })
      .value();

    this.allGames = this.games;
    this.teamStanding = _.find(this.tournamentData.standings, {'teamId': this.team.id});
    this.userSettings.isFavoriteTeam(this.team.id).then(value => this.isFollowing = value);
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      const teamScore = (isTeam1 ? team1Score : team2Score);
      const opponentScore = (isTeam1 ? team2Score : team1Score);
      const winIndicator = teamScore > opponentScore ? "W: " : "L: ";

      return winIndicator + teamScore + "-" + opponentScore;
    } else {
      return "";
    }
  }

  gameClicked($event, game) {
    const sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  getScoreWinOrLoss(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadgeColor(game) {
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  }

  dateChanged() {
    this.games = this.useDateFilter
      ? _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'))
      : this.allGames;
  }

  toggleFollow() {
    if (this.isFollowing) {
      const confirm = this.alertCtrl.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.userSettings.unfavoriteTeam(this.team);

              const toast = this.toastCtrl.create({
                message: 'You have unfollowed this team.',
                duration: 2000,
                position: 'bottom'
              });

              toast.present();
            }
          },
          { text: 'No'}
        ]
      });

      confirm.present();
    } else {
      this.isFollowing = true;
      this.userSettings.favoriteTeam(
        this.team,
        this.tournamentData.tournament.id,
        this.tournamentData.tournament.name);
    }
  }

  refreshAll(refresher) {
    this.eliteApi.refreshCurrentTournament().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    });
  }
}
