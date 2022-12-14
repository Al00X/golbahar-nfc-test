import { Component } from '@angular/core';
import {SQLiteService} from "../services/sqlite.service";
import {CapacitorSQLite, SQLiteDBConnection} from "@capacitor-community/sqlite";
import {createSchema} from "../services/schema";

const DB_NAME = 'test';

@Component({
  selector: 'app-sqlite',
  templateUrl: './sqlite.component.html',
  styleUrls: ['./sqlite.component.scss']
})
export class SqliteComponent {
  db?: SQLiteDBConnection;
  constructor(private sqlite: SQLiteService) {
    this.initDb();
  }

  private async initDb() {
    console.log();
    // if (!(await this.sqlite.isDatabase(DB_NAME)).result) {
    //   await this.sqlite.saveToStore(DB_NAME);
    // }
    this.db = await this.sqlite.createConnection(DB_NAME, false,'no-encryption', 1);

    this.db.run(createSchema);
  }
}
