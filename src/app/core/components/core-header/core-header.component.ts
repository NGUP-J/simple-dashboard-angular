import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../features/auth/models/user.model';

@Component({
  selector: 'app-core-header',
  templateUrl: './core-header.component.html',
  styleUrl: './core-header.component.css',
})
export class CoreHeaderComponent implements OnInit {
  user?: User;

  constructor(private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();

  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
