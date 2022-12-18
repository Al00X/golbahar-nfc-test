import { Injectable } from '@angular/core';
import {SqliteWrapperService} from "./sqlite.wrapper.service";
import {SQLiteDBConnection} from "@capacitor-community/sqlite";

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  databaseName?: string;
  connection?: SQLiteDBConnection;

  constructor(private sqlite: SqliteWrapperService) {
  }

  async initConnection(dbName: string) {
    console.log('CREATING CONNECTION')
    this.databaseName = dbName;
    const connection = await this.sqlite.createConnection(dbName, false, 'no-encryption', 1);
    this.connection = connection;
    return connection;
  }

  async retrieveConnection() {
    console.log('RETRIEVING CONNECTION')
    return this.sqlite.retrieveConnection(this.databaseName ?? '');
  }

  async isConnected() {
    return (await this.sqlite.isConnection(this.databaseName ?? '')).result
  }

  async getOrCreateConnection(dbName?: string) {
    const consistent = (await this.sqlite.checkConnectionsConsistency()).result
    if (dbName) {
      this.databaseName = dbName;
    }
    const isConn = await this.isConnected()

    if (consistent && isConn) {
      return this.retrieveConnection();
    } else {
      return this.initConnection(this.databaseName ?? '');
    }
  }

  async closeConnection() {
    return await this.sqlite.closeAllConnections();
  }

  async save() {
    if (this.sqlite.platform === 'web') {
      return this.sqlite.saveToStore(this.databaseName ?? '');
    }
  }
}
