import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
export class SignupComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  signup(form: NgForm) {
    this.auth.signup(form.value.username, form.value.password);
  }

}
