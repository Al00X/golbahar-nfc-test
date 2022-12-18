import { Component } from '@angular/core';
import { SQLiteService } from '../services/sqlite.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import {
  DELETE_FROM_DATA,
  IData,
  INSERT_TO_DATA,
  QUERY_ALL_FROM_DATA,
  SCHEMA_CREATE_DATA_TABLE
} from "../services/schema";
import {BehaviorSubject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sqlite',
  templateUrl: './sqlite.component.html',
  styleUrls: ['./sqlite.component.scss'],
})
export class SqliteComponent {
  db?: SQLiteDBConnection;
  databaseIsReady = false;
  currentData$ = new BehaviorSubject<IData[] | undefined>(undefined);
  form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    age: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(150)]),
  });
  saving = false;

  constructor(public sqlite: SQLiteService) {
    this.initDb().then(() => {
      this.queryAllRows();
    });
  }

  onSaveEntry() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    const values = this.form.value;
    this.db!.run(INSERT_TO_DATA, [values.firstname, values.lastname, values.age]).then(() => {
      this.saveAndRevaluate();
    }).catch(() => {
      alert('Failed to save :(');
    }).finally(() => {
      this.saving = false;
    })
  }

  onDeleteEntry(id: number) {
    this.db!.run(DELETE_FROM_DATA, [id]).then(() => {
      this.saveAndRevaluate();
    });
  }

  private async initDb() {
    this.db = await this.sqlite.retrieveConnection();
    await this.db.open();
    await this.db.run(SCHEMA_CREATE_DATA_TABLE);
    await this.sqlite.save();
    this.databaseIsReady = true;
  }

  private saveAndRevaluate() {
    this.sqlite.save();
    this.queryAllRows();
  }

  private async queryAllRows() {
    const result = await this.db?.query(QUERY_ALL_FROM_DATA);
    this.currentData$.next(result?.values);
  }
}
