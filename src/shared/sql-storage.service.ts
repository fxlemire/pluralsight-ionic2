import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

@Injectable()
export class SqlStorage {
  db: SQLite;

  constructor() { }

  initializeDatabase() {
    this.db = new SQLite();

    return this.db.openDatabase({
      name: 'data.db',
      location: 'default'
    }).then(() => {
      this.db
        .executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', [])
        .then(data => {
          console.log('**after CREATE TABLE check', data);
        });
    });
  }

  getAll() {
    return this.db.executeSql('SELECT key, value FROM kv', []).then(data => {
      const results = [];

      for (let i = 0; i < data.rows.length; ++i) {
        results.push(JSON.parse(data.rows.item(i).value));
      }

      return results;
    });
  }

  get(key: string) {
    return this.db.executeSql('SELECT key, value FROM kv WHERE key = ? LIMIT 1', [key]).then(data => {
      if (data.rows.length > 0) {
        return JSON.parse(data.rows.item(0).value);
      }
    });
  }

  remove(key: string) {
    return this.db.executeSql('DELETE FROM kv WHERE key = ?', [key]);
  }

  set(key: string, value: string) {
    return this.db.executeSql('INSERT OR REPLACE INTO kv(key, value) VALUES (?, ?)', [key, value])
  }
}
