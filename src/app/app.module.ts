import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { GamePage, MapPage, MyTeamsPage, StandingsPage, TeamDetailPage, TeamHomePage, TeamsPage, TournamentsPage } from '../pages/pages';
import { EliteApi, UserSettings } from '../shared/shared';

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    MapPage,
    MyTeamsPage,
    StandingsPage,
    TeamDetailPage,
    TeamHomePage,
    TeamsPage,
    TournamentsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: ''})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    MapPage,
    MyTeamsPage,
    StandingsPage,
    TeamDetailPage,
    TeamHomePage,
    TeamsPage,
    TournamentsPage
  ],
  providers: [
    EliteApi,
    Storage,
    UserSettings
  ]
})
export class AppModule {}
