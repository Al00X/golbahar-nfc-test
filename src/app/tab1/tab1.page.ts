import { Component } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import {BehaviorSubject, tap} from "rxjs";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  index = -1;
  isScanning$ = new BehaviorSubject(false);
  currentInputs: { name: string; type: string }[] = [];
  constructor(private nfc: NFC, private ndef: Ndef) {}

  onScanNFC() {
    this.nfc.readerMode(this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V).pipe(tap(() => {
      this.isScanning$.next(true);
    })).subscribe({
      next: (tag) => {
        console.log(JSON.stringify(tag));
        this.mockInputs();
        this.isScanning$.next(false);
      },
      error: (err) => {
        alert(`Error: ${err}`)
        this.isScanning$.next(false);
      },
    });
  }

  private mockInputs() {
    this.cycleIndex();
    this.updateInputs();
  }

  private updateInputs() {
    switch (this.index) {
      case 0:
        this.currentInputs = [
          { name: 'First Name', type: 'text' },
          { name: 'Email', type: 'email' },
          { name: 'Password', type: 'password' },
        ];
        break;
      case 1:
        this.currentInputs = [
          { name: 'Part Serial', type: 'text' },
          { name: 'Count', type: 'number' }
        ];
        break;
      case 2:
        this.currentInputs = [
          { name: 'Something', type: 'text' },
          { name: 'Another thing', type: 'text' },
        ]
    }
  }

  private cycleIndex() {
    if (this.index === 2) {
      this.index = 0;
    } else {
      this.index++;
    }
  }
}
