import { Component } from '@angular/core';
import { SQLiteService } from './services/sqlite.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isWeb: boolean = false;
  public sqliteLoaded = false;
  constructor(private platform: Platform, private sqlite: SQLiteService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.sqlite.initializePlugin().then(async (ret) => {
        if (this.sqlite.platform === 'web') {
          this.isWeb = true;
          await customElements.whenDefined('jeep-sqlite');
          const jeepSqliteEl = document.querySelector('jeep-sqlite');
          if (jeepSqliteEl != null) {
            await this.sqlite.initWebStore();
            this.sqliteLoaded = true;
            console.log(`>>>> isStoreOpen ${await jeepSqliteEl.isStoreOpen()}`);
          } else {
            console.log('>>>> jeepSqliteEl is null');
          }
        }

        console.log(`>>>> in App  this.initPlugin ${ret}`);
      });
    });
  }
}
