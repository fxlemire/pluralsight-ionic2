import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TeamHomePage } from '../pages';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.page.html'
})
export class TeamsPage {
  teams = [
    {id: 1, name: 'HC Elite'},
    {id: 2, name: 'Team Takeover'},
    {id: 3, name: 'DC Thunder'}
  ];

  constructor(private navCtrl: NavController) {}

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

}
