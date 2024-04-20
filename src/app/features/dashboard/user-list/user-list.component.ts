import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AllUser } from '../models/all-user.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, OnDestroy {
  users$?: Observable<AllUser>;

  private countUserSubscription: Subscription | undefined;
  private refreshRequiredSubscription: Subscription | undefined;

  totalCount = 0;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 5;
  search = '';
  orderDircetion = 'asc';
  orderby = 'Name';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.countUserSubscription = this.userService.getUserCount().subscribe({
      next: (value) => {
        this.totalCount = value;
        this.list = new Array(Math.ceil(value / this.pageSize));
        this.GetAll(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
      },
    });

    this.refreshRequiredSubscription = this.userService.Refreshrequired.subscribe(() => {
      this.userService.getUserCount().subscribe({
        next: (value) => {
          this.totalCount = value;
          this.GetAll(
            undefined,
            undefined,
            undefined,
            this.pageNumber,
            this.pageSize
          );
        },
      });
    });
  }

  onDelete(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        this.GetAll(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
      },
    });
  }

  onSearch(search?: string): void {
    this.search = search || '';
    this.countUserSubscription = this.userService.getUserCount().subscribe({
      next: (value) => {
        this.totalCount = value;
        this.list = new Array(Math.ceil(value / this.pageSize));
        this.GetAll(
          this.search,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
      },
    });
  }

  sort(orderBy: string, orderDirection: string): void {
    this.orderDircetion = orderDirection;
    this.users$ = this.userService.getAllUsers(
      this.search,
      this.orderby,
      this.orderDircetion,
      this.pageNumber,
      this.pageSize
    );
  }

  getPage(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.GetAll(
      this.search,
      this.orderby,
      this.orderDircetion,
      this.pageNumber,
      this.pageSize
    );
  }

  getPrevPage(): void {
    if (this.pageNumber - 1 < 1) return;

    this.pageNumber -= 1;
    this.GetAll(
      this.search,
      this.orderby,
      this.orderDircetion,
      this.pageNumber,
      this.pageSize
    );
  }

  getNextPage(): void {
    if (this.pageNumber + 1 > this.list.length) return;

    this.pageNumber += 1;
    this.GetAll(
      this.search,
      this.orderby,
      this.orderDircetion,
      this.pageNumber,
      this.pageSize
    );
  }

  ngOnDestroy(): void {
    this.countUserSubscription?.unsubscribe();
    this.refreshRequiredSubscription?.unsubscribe();
  }

  onPageSizeChange(): void {
    console.log(this.pageSize);
    this.pageNumber = 1; // Reset pageNumber when pageSize changes
    this.countUserSubscription = this.userService.getUserCount().subscribe({
      next: (value) => {
        this.totalCount = value;
        this.list = new Array(Math.ceil(value / this.pageSize));
        this.GetAll(
          this.search,
          this.orderby,
          this.orderDircetion,
          this.pageNumber,
          this.pageSize
        );
      },
    });
  }

  GetAll(
    search?: string,
    orderBy?: string,
    orderDirection?: string,
    pageNumber?: number,
    pageSize?: number
  ): void {
    console.log(search, orderBy, orderDirection, pageNumber, pageSize);
    this.users$ = this.userService.getAllUsers(
      search,
      orderBy,
      orderDirection,
      pageNumber,
      pageSize
    );
  }
}
