import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../model/user';

@Injectable()
export class UserDBProvider {

  //region PRIVATE_VARIABLES
  private database: SQLiteObject
  private dbReady = new BehaviorSubject<boolean>(false)
  private user = new BehaviorSubject<User>(null)
  //endregion PRIVATE_VARIABLES

  //region CONSTRUCTOR
  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'pbuser.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db

          this.createTables().then(() => {
            this.dbReady.next(true)
          })
        })
    })
  }
  //endregion CONSTRUCTOR

  //region PRIVATE_METHODS
  private createTables() {
    return this.database.executeSql(
      "CREATE TABLE IF NOT EXISTS `users` (" +
      "`id` INTEGER PRIMARY KEY," +
      "`user` varchar(256) NULL," +
      "`pass` varchar(40) NULL," +
      "`email` varchar(256) NOT NULL," +
      "`guser` tinyint(1) NOT NULL," +
      "`token` varchar(256) NOT NULL" +
      ");", {})
      .then(() => {

      })
      .catch((err) => console.log("error detected creating tables", err));
  }

  private isReady() {
    return new Promise((resolve, reject) => {
      if (this.dbReady.getValue()) {
        resolve();
      }
      else {
        this.dbReady.subscribe((ready) => {
          if (ready) {
            resolve();
          }
        });
      }
    })
  }

  //endregion PRIVATE_METHODS
  
  //region PUBLIC_METHODS
  public addUser(user: User) {
    
    user.user = user.user == "None" ? null : user.user
    return this.isReady()
    .then(() => {
      return this.database.executeSql(`INSERT INTO users
      (id, user, email, pass, guser, token) VALUES (?, ?, ?, ?, ?, ?);`,
      [user.id, user.user, user.email, user.pass, user.guser, user.token]);
    });
  }
  
  public modifyUserToken(token: string) {
    return this.isReady()
    .then(() => {
      return this.database.executeSql(`UPDATE users 
      SET token = ?
      WHERE id like (SELECT id from users)`,
      [token]);
    });
  }
  
  public removeUser() {
    return this.isReady()
    .then(() => {
      return this.database.executeSql(`DELETE FROM users WHERE id like (SELECT id from users)`, [])
    })
  }
  
  public getUser() {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM users`, [])
          .then((data) => {
            if (data.rows.length) {
              return data.rows.item(0)
            }
            return null;
          })
      })
  }
  //endregion PUBLIC_METHODS
  
}
