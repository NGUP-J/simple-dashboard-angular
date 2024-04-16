import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { AddUserRequest } from '../models/add-user-request.model';
import { Guid } from 'guid-typescript';
import { UserService } from '../services/user.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AllUser } from '../models/all-user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnDestroy {
  model: AddUserRequest;
  private addUserSubscription?: Subscription;
  users$?: Observable<AllUser>;
  selectRole?: string;
  availableOptions: [{ id: '1'; name: 'Lorem Ipsum' }] | undefined;

  constructor(private userService: UserService, private router: Router) {
    this.model = {
      Id: Guid.create().toString(),
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      roleId: '',
      username: '',
      password: '',
      permissions: [
        {
          permissionId: '1',
          isReadable: false,
          isWritable: false,
          isDeletable: false,
        },
        {
          permissionId: '2',
          isReadable: false,
          isWritable: false,
          isDeletable: false,
        },
        {
          permissionId: '3',
          isReadable: false,
          isWritable: false,
          isDeletable: false,
        },
      ],
    };
  }

  ngOnInit(): void {
    this.setUserList();
  }

  onFormSubmit() {
    this.model.roleId = this.selectRole?.toString() || '1'.toString();
    console.log(this.model);
    this.addUserSubscription = this.userService.addUser(this.model).subscribe({
      next: (response) => {
        console.log('User added successfully');
        this.router.navigate(['/']);
      },
    });
    this.resetForm();
  }

  ngOnDestroy(): void {
    this.addUserSubscription?.unsubscribe();
  }

  private setUserList() {
    this.users$ = this.userService.getAllUsers();
  }

  private resetForm() {
    this.model = {
      Id: Guid.create().toString(),
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      roleId: '',
      username: '',
      password: '',
      permissions: [
        {
          permissionId: '1',
          isReadable: false,
          isWritable: false,
          isDeletable: false,
        },
        {
          permissionId: '2',
          isReadable: false,
          isWritable: false,
          isDeletable: false,
        },
        {
          permissionId: '3',
          isReadable: false,
          isWritable: false,
          isDeletable: false,
        },
      ],
    };
  }
}
