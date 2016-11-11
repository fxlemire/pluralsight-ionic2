import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';

@Injectable()
export class UserSettings {
  constructor(public events: Events, public storage: Storage) {}

  favoriteTeam(team, tournamentId, tournamentName) {
    const item = {team, tournamentId, tournamentName};

    return new Promise(resolve => {
      this.storage.set(team.id.toString(), JSON.stringify(item)).then(() => {
        this.events.publish('favorites:changed');
        resolve();
      });
    });
  }

  unfavoriteTeam(team) {
    return new Promise(resolve => {
      this.storage.remove(team.id.toString()).then(() => {
        this.events.publish('favorites:changed');
        resolve();
      });
    });
  }

  isFavoriteTeam(teamId) {
    return this.storage.get(teamId.toString()).then(value => !!value);
  }

  getAllFavorites() {
    return new Promise(resolve => {
      const items = [];

      this.storage.forEach(data => {
        items.push(JSON.parse(data));
      });

      return resolve(items);
    });
  }
}
