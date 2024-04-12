import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AllUser } from '../models/all-user.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  users$?: Observable<AllUser>;
  constructor(private userService: UserService,private router: Router) {}
 

  ngOnInit(): void {
    this.GetAll();
    this.userService.Refreshrequired.subscribe(() => {
      this.GetAll();
    });
  }

  onDelete(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']);
      }
    });
  } 

  onSearch(search?: string): void {
    this.GetAll(search);
  }

  sort(orderBy: string, orderDirection: string): void {
    this.users$ = this.userService.getAllUsers(undefined, orderBy, orderDirection);
  }

  GetAll(search?: string) {
    this.users$ = this.userService.getAllUsers(search);
  }
}
