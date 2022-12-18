import { Component } from '@angular/core';
import { SQLiteService } from './services/sqlite.service';
import { Platform } from '@ionic/angular';
import {SqliteWrapperService} from "./services/sqlite.wrapper.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isWeb: boolean = false;
  public sqliteLoaded = false;
  DATABASE_NAME = 'test';

  constructor(private platform: Platform, private sqlite: SQLiteService, private sqliteWrapper: SqliteWrapperService) {
    this.initializeSqlite();
  }

  initializeSqlite() {
    this.platform.ready().then(async () => {
      this.sqliteWrapper.initializePlugin().then(async (ret) => {
        if (this.sqliteWrapper.platform === 'web') {
          this.isWeb = true;
          await customElements.whenDefined('jeep-sqlite');
          const jeepSqliteEl = document.querySelector('jeep-sqlite');
          if (jeepSqliteEl != null) {
            await this.sqliteWrapper.initWebStore();
            console.log(`>>>> isStoreOpen ${await jeepSqliteEl.isStoreOpen()}`);
            if (!this.sqlite.isConnected$.value) {
              await this.sqlite.initConnection(this.DATABASE_NAME).then(() => {
                console.log(`Sqlite is connected to the database: ${this.DATABASE_NAME}`);
              });
            }
          } else {
            console.log('>>>> jeepSqliteEl is null');
          }
        }
        this.sqliteLoaded = true;
        console.log(`>>>> in App  this.initPlugin ${ret}`);
      }).catch((err) => {
        console.error('Sqlite Init failed:', err);
      });
    }).catch((err) => {
      console.error('Platform failed to ready up (app.component)', err);
    });
  }
}
