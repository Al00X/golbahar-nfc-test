import { Injectable } from '@angular/core';

import {SqliteWrapperService} from "./sqlite.wrapper.service";
import {SQLiteDBConnection} from "@capacitor-community/sqlite";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  databaseName?: string;
  connection?: SQLiteDBConnection;
  isConnected$ = new BehaviorSubject(false);

  constructor(private sqlite: SqliteWrapperService) {
  }

  async initConnection(dbName: string) {
    this.databaseName = dbName;
    return this.sqlite.createConnection(dbName, false, 'no-encryption', 1).then((c) => {
      this.connection = c;
      this.setIsConnectedState(true);
    });
  }

  async retrieveConnection() {
    return this.sqlite.retrieveConnection(this.databaseName ?? '');
  }

  async save() {
    return this.sqlite.saveToStore(this.databaseName ?? '');
  }

  private setIsConnectedState(state: boolean) {
    this.isConnected$.next(state);
  }
}
