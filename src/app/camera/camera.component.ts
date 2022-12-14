import {Component, ElementRef, ViewChild} from '@angular/core';
import {Camera, CameraResultType} from "@capacitor/camera";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent {
  @ViewChild('Preview') imgEl!: ElementRef<HTMLImageElement>;

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    this.imgEl.nativeElement.src = image.webPath ?? '';
  };
}
