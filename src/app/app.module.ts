import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Ndef, NFC} from '@awesome-cordova-plugins/nfc/ngx';
import { SqliteComponent } from './sqlite/sqlite.component';
import {SQLiteService} from "./services/sqlite.service";
import { CameraComponent } from './camera/camera.component';
import { GeoComponent } from './geo/geo.component';
import { FileComponent } from './file/file.component';
import { PreferencesComponent } from './preferences/preferences.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, SqliteComponent, CameraComponent, GeoComponent, FileComponent, PreferencesComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NFC,
    Ndef,
    SQLiteService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
