import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input()
  requiredFileType: string;
  @Input()
  apiUrl = '';
  fileName = '';
  uploadProgress: number;
  uploadSub: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('filecsvpart', file);

      const upload$ = this.http.post(this.apiUrl, formData, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          finalize(() => this.reset())
        );

      this.uploadSub = upload$.subscribe(event2 => {
        if (event2.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event2.loaded / event2.total));
        }
      });
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
