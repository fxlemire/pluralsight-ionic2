import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-game',
  templateUrl: 'game.page.html'
})
export class GamePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello GamePage Page');
  }

}
