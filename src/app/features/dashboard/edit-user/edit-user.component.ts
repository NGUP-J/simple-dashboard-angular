import { Component, Input, input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { EditUserRequest } from '../models/edit-user-request.model';
import { User } from '../models/user.model';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit, OnDestroy {
  edit: EditUserRequest;
  user?: User;

  editUserSubscription?: Subscription;
  paramsSubscription?: Subscription;
  roleOptions = [
    { value: '1', label: 'Lorem Ipsum' },
  ];
  permissionlist = ['', 'Super Admin', 'Admin', 'Employee'];

  @Input()
  id: string | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private userlist : UserListComponent
  ) {
    this.edit = {
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
    // this.id = params.get('id');
    // console.log(this.id);

    if (this.id) {
      this.paramsSubscription = this.userService
        .getUserById(this.id)
        .subscribe({
          next: (response) => {
            this.user = response;
            this.edit = {
              firstName: this.user.data.firstName,
              lastName: this.user.data.lastName,
              email: this.user.data.email,
              phone: this.user.data.phone,
              roleId: this.user.data.role.roleId,
              username: this.user.data.username,
              password: '',
              permissions: [
              ],
            };

            for (const permission of this.user.data.permissions) {
              this.edit.permissions.push({
                permissionId: permission.permissionId,
                isReadable: permission.isReadable,
                isWritable: permission.isWritable,
                isDeletable: permission.isDeletable,
              });
            }
          },
        });
    }
  }

  onFormSubmit(): void {
    // this.edit.roleId = this.selectRole?.toString() || '1'.toString();
    // console.log(this.edit);
    const EditUserRequest: EditUserRequest = {
      firstName: this.edit.firstName,
      lastName: this.edit.lastName,
      email: this.edit.email,
      phone: this.edit.phone ?? '',
      roleId: this.edit.roleId,
      username: this.edit.username,
      password: this.edit.password,
      permissions: this.edit.permissions,
    };
    if (this.id) {
      this.editUserSubscription = this.userService
        .editUser(this.id, EditUserRequest)
        .subscribe({
          next: (response) => {
            console.log('User edited successfully');
            //this.router.navigate(['/']);
            this.userlist.GetAll(this.userlist.search, this.userlist.orderby, this.userlist.orderDircetion, this.userlist.pageNumber, this.userlist.pageSize);
          },
        });
    }

    console.log(this.edit);
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editUserSubscription?.unsubscribe();
  }

  // resetForm() {
  //   this.edit = {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     phone: '',
  //     roleId: '',
  //     username: '',
  //     password: '',
  //     permissions: [
  //       {
  //         permissionId: '1',
  //         isReadable: false,
  //         isWritable: false,
  //         isDeletable: false
  //       },
  //       {
  //         permissionId: '2',
  //         isReadable: false,
  //         isWritable: false,
  //         isDeletable: false
  //       },
  //       {
  //         permissionId: '3',
  //         isReadable: false,
  //         isWritable: false,
  //         isDeletable: false
  //       }
  //     ]
  //   }
  // }
}
