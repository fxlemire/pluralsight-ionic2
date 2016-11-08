import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.page.html'
})
export class TeamDetailPage {
  team: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.team = this.navParams.data;
  }
}
