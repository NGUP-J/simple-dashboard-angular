import { Component, OnInit } from '@angular/core';
import { User } from '../../../features/auth/models/user.model';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  user?: User;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();

  }


  onGroupClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (clickedElement.nodeName === 'A') {
      const isCertainButtonAlreadyActive =
        clickedElement.parentElement?.parentElement?.querySelector('.actived');
      // if a Button already has Class: .active
      if (isCertainButtonAlreadyActive) {
        isCertainButtonAlreadyActive.classList.remove('actived');
        isCertainButtonAlreadyActive.classList.add('link-secondary');
      }

      clickedElement.className += ' actived';
      clickedElement.classList.remove('link-secondary');
    }
  }
}
