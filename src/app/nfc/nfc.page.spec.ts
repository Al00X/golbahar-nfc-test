import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NFCComponent } from './nfc.page';

describe('Tab1Page', () => {
  let component: NFCComponent;
  let fixture: ComponentFixture<NFCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NFCComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NFCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
