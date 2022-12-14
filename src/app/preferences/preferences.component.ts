import {Component, OnDestroy} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Preferences} from "@capacitor/preferences";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnDestroy {
  control = new FormControl();
  saved = false;
  subs = new Subscription();

  constructor() {
    this.load();
    this.subs.add(this.control.valueChanges.subscribe(() => {
      this.saved = false;
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  async load() {
    const { value } = await Preferences.get({ key: 'name' });
    this.control.setValue(value ?? '');
  }

  async save() {
    await Preferences.set({
      key: 'name',
      value: this.control.value,
    });
    this.saved = true;
  }
}
