import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from './notifications.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private id: number = 0;
  private notifications: Notification[] = [];
  private notificationsSubject = new Subject<Notification>();

  getObservable() {
    return this.notificationsSubject.asObservable();
  }

  addNotification(msg: string) {
    this.notificationsSubject.next({ id: this.id++, message: msg });
  }
  constructor() {}
}
