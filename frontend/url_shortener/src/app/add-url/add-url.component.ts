import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UrlRestService } from '../services/url-rest.service';

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.css'],
})
export class AddUrlComponent {
  constructor(private _urlRestService: UrlRestService) {}
  shortenedURL: string = '';
  inputURL_Form = new FormControl<string>('', {
    validators: [
      Validators.required,
      //check for a valid link (only basic regex)
      Validators.pattern(/^(http|https):\/\/.*/),
    ],
    nonNullable: true,
  });

  copyToClipboard() {
    navigator.clipboard.writeText(this.shortenedURL);
  }
  submitURL() {
    console.log(this.inputURL_Form.value);
    this.inputURL_Form.markAllAsTouched();
    if (this.inputURL_Form.valid) {
      console.log('valid');
      this._urlRestService
        .addShortURL(this.inputURL_Form.value)
        .subscribe((data) => {
          console.log(data);
          //@ts-ignore
          this.shortenedURL = data;
        });
    } else {
      console.log('invalid');
    }
  }
}
