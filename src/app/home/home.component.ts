import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string = '';
  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.getUsername().subscribe(data=>{
      this.username = data.username;
    })
  }

  logout(): void {
    this.authService.logout();
  }
}
