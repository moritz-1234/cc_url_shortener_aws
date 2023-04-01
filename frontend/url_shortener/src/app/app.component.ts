import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { UrlRestService } from './services/url-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'url_shortener';
  constructor(
    private _router: Router,
    private _urlRestService: UrlRestService
  ) {}
  ngOnInit(): void {
    this._router.events.subscribe((ev) => {
      if (ev instanceof ActivationEnd) {
        // console.log(ev.snapshot?.url[0]?.path);
        const path = ev.snapshot?.url[0]?.path;
        console.log(path, typeof path);
        if (path) {
          this._urlRestService.getLongURL(path).subscribe((result) => {
            if (result.long_url) {
              window.location.replace(result.long_url);
            } else {
              console.log('no long url');
            }
          });
        } else {
          console.log('no path');
        }
      }
    });
  }
}
