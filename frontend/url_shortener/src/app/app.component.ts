import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { UrlRestService } from './services/url-rest.service';
import { AlertService } from './toast/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'url_shortener';
  constructor(
    private _router: Router,
    private _urlRestService: UrlRestService,
    private _alertService: AlertService
  ) {}
  ngOnInit(): void {
    this._router.events.subscribe((ev) => {
      if (ev instanceof ActivationEnd) {
        // console.log(ev.snapshot?.url[0]?.path);
        const path = ev.snapshot?.url[0]?.path;
        if (path) {
          this._urlRestService.getLongURL(path).subscribe((result) => {
            if (result.long_url) {
              window.location.replace(result.long_url);
            } else {
              this._alertService.setAlert(
                `No URL found for ${path}. Make sure ${path} exists.`
              );
            }
          });
        } else {
          console.log('no path');
        }
      }
    });
  }
}
