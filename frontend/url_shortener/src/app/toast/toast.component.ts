import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Toast } from 'bootstrap';
import { AlertService } from './alert.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements AfterViewInit, OnDestroy {
  t!: Toast;
  sub!: Subscription;
  constructor(private _alertService: AlertService) {
    this._alertService.getAlert$().subscribe((alert) => {
      if (alert) {
        this.toast.nativeElement.querySelector('.toast-body').textContent =
          alert;
        const t = new Toast(this.toast.nativeElement);
        t.show();
      }
    });
  }
  @ViewChild('errorToast') toast!: ElementRef;
  ngAfterViewInit(): void {
    this.t = new Toast(this.toast.nativeElement);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
