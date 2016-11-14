import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SqlStorage } from './shared';

const win: any = window;

@Injectable()
export class UserSettings {
  sql: SqlStorage;

  constructor(public events: Events, public storage: Storage) { }

  favoriteTeam(team, tournamentId, tournamentName) {
    const item = { team, tournamentId, tournamentName };

    if (this.sql) {
      this.sql.set(team.id.toString(), JSON.stringify(item)).then(data => {
        this.events.publish('favorites:changed');
      });
    } else {
      return new Promise(resolve => {
        this.storage.set(team.id.toString(), JSON.stringify(item)).then(() => {
          this.events.publish('favorites:changed');
          resolve();
        });
      });
    }
  }

  unfavoriteTeam(team) {
    if (this.sql) {
      this.sql.remove(team.id.toString()).then(data => {
        this.events.publish('favorites:changed');
      });
    } else {
      return new Promise(resolve => {
        this.storage.remove(team.id.toString()).then(() => {
          this.events.publish('favorites:changed');
          resolve();
        });
      });
    }
  }

  isFavoriteTeam(teamId) {
    if (this.sql) {
      return this.sql.get(teamId.toString()).then(value => !!value);
    } else {
      return this.storage.get(teamId.toString()).then(value => !!value);
    }
  }

  getAllFavorites() {
    if (this.sql) {
      return this.sql.getAll();
    } else {
      return new Promise(resolve => {
        const items = [];

        this.storage.forEach(data => {
          items.push(JSON.parse(data));
        });

        return resolve(items);
      });
    }
  }

  initStorage() {
    if (win.sqlitePlugin) {
      this.sql = new SqlStorage();
      return this.sql.initializeDatabase();
    } else {
      console.warn('SQLite plugin not installed. Falling back to regular Ionic Storage.');
      return new Promise(resolve => resolve());
    }
  }
}
