import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {TeamHomePage, TournamentsPage} from '../pages';
import {EliteApi, UserSettings} from '../../shared/shared';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.page.html'
})
export class MyTeamsPage {
  favorites = [];
  //   {
  //     team: {id: 6182, name: 'HC Elite 7th', coach: 'Michelotti'},
  //     tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
  //     tournamentName: 'March Madness Tournament'
  //   },
  //   {
  //     team: {id: 805, name: 'HC Elite', coach: 'Michelotti'},
  //     tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
  //     tournamentName: 'Holiday Hoops Challenge'
  //   }
  // ];

  constructor(
      public loadingCtrl: LoadingController,
      public navCtrl: NavController,
      public eliteApi: EliteApi,
      public userSettings: UserSettings){}

  favoriteTapped($event, favorite) {
    const loader = this.loadingCtrl.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });

    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
      .subscribe(t => this.navCtrl.push(TeamHomePage, favorite.team));
  }

  goToTournaments() {
    this.navCtrl.push(TournamentsPage);
  }

  ionViewDidEnter() {
    this.userSettings.getAllFavorites().then((favs: any[]) => this.favorites = favs);
  }
}
