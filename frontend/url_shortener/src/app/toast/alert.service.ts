import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}
  private alert$ = new BehaviorSubject<string | null>(null);
  setAlert(alert: string) {
    this.alert$.next(alert);
  }
  getAlert$() {
    return this.alert$;
  }
}
