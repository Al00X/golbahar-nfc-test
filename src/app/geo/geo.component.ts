import { Component } from '@angular/core';
import {Geolocation, Position} from '@capacitor/geolocation';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.scss']
})
export class GeoComponent {
  currentPosition?: Position;
  loading = false;

  async getLocation() {
    this.loading = true;
    this.currentPosition = await Geolocation.getCurrentPosition();
    console.log(this.currentPosition);
    this.loading = false;
  };
}
