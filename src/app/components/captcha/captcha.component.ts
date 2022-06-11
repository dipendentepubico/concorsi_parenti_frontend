import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CaptchaService} from '../../api/services/captcha.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  // base64
  imageToShow: string;
  usc: string;
  @Output()
  captchaEntered = new EventEmitter<string>();

  constructor(private captchaService: CaptchaService) { }

  ngOnInit(): void {
    this.captchaService.generateCaptcha().subscribe(
      value => {
        this.createImageFromBlob(value.body);
      }
    );
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load',
      () => {
        this.imageToShow = reader.result as string;
      }
      , false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  notifyForm() {
    this.captchaEntered.emit(this.usc);
  }
}
