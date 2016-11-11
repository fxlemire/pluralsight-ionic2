import { Component, ViewChild } from '@angular/core';
import { Events, LoadingController, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MyTeamsPage, TeamHomePage, TournamentsPage } from '../pages/pages';
import { EliteApi, UserSettings } from '../shared/shared';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  constructor(
      public events: Events,
      public platform: Platform,
      public loadingCtrl: LoadingController,
      public eliteApi: EliteApi,
      public userSettings: UserSettings) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.refreshFavorites();
      Splashscreen.hide();

      this.events.subscribe('favorites:changed', () => this.refreshFavorites());
    });
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTeam(favorite) {
    const loader = this.loadingCtrl.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });

    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team));
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites().then((favs: any[]) => this.favoriteTeams = favs);
  }
}
