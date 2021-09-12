import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { Notification } from './notifications.model'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-100%) translateX(-30px)'}),
        animate('400ms ease', style({ transform: 'none', opacity: 1 })),
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'none'}),
        animate('400ms ease', style({ transform: 'translateX(-100%) translateX(-30px)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.notificationsService.getObservable().subscribe((notification) => {
      this.notifications.push(notification);
      setTimeout(()=>{
        this.notifications = this.notifications.filter(element =>{
          return element.id !== notification.id;
        });
      }, 3000)
    });
  }

  remove(index: number): void {
    this.notifications = this.notifications.filter(element =>{
      return element.id !== this.notifications[index].id;
    });
  }
}
