import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UrlRestService } from '../services/url-rest.service';
import { AlertService } from '../toast/alert.service';
@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.css'],
})
export class AddUrlComponent {
  constructor(
    private _urlRestService: UrlRestService,
    private _alertService: AlertService
  ) {}
  shortenedURL: string = '';
  inputURL_Form = new FormControl<string>('', {
    validators: [
      Validators.required,
      //check for a valid link (only basic regex)
      Validators.pattern(/^(http|https):\/\/.*/),
    ],
    nonNullable: true,
  });
  loadingUrlValid: boolean = false; //for the loading spinner in the button
  urlValid: boolean = false; //will be set to true if the entered url is reachable by the backend
  copyToClipboard() {
    navigator.clipboard.writeText(this.shortenedURL);
  }
  /**
   * called when the user clicks the button next to the input field (only possible if the input is valid)
   */
  async submitURL() {
    this.inputURL_Form.markAllAsTouched();
    //reset values
    this.shortenedURL = '';
    this.urlValid = false;
    this.loadingUrlValid = false;

    if (this.inputURL_Form.valid) {
      this.loadingUrlValid = true; //start loading spinner
      //get online status from backend
      const online = (
        await this._urlRestService
          .checkIfOnline(this.inputURL_Form.value)
          .toPromise()
      )?.available;
      this.loadingUrlValid = false; //stop loading spinner
      if (online) {
        this.urlValid = online;
        this._urlRestService
          .addShortURL(this.inputURL_Form.value)
          .subscribe((result) => {
            result.shortUrl;
            this.shortenedURL = `${location.origin}/${result.shortUrl}`; //display the result url in the input field
          });
      } else {
        this._alertService.setAlert('URL is not online');
      }
    } else {
      console.log('invalid');
    }
  }
}
