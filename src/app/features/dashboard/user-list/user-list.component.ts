import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DataSource, User } from '../models/user.model';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  users$?: Observable<User>;
  constructor(private userService: UserService) {}
 

  ngOnInit(): void {
    this.GetAll();
    this.userService.Refreshrequired.subscribe(() => {
      this.GetAll();
    });
  }

  GetAll() {
    this.users$ = this.userService.getAllUsers();
  }
}
