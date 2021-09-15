import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('ErrorAnimation', [
      transition(':enter', [
        style({ opacity: 0, ['max-height']: '0' }),
        animate(
          '200ms 400ms ease',
          style({ opacity: 1, ['max-height']: '25px' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, ['max-height']: '25px' }),
        animate('200ms 400ms ease', style({ opacity: 0, ['max-height']: 0 })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    this.auth.login(form.value.username, form.value.password);
  }
}
