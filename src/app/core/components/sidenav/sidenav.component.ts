import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  constructor() {}

  onGroupClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (clickedElement.nodeName === "A") {
      const isCertainButtonAlreadyActive = clickedElement.parentElement?.parentElement?.querySelector(".active");
      // if a Button already has Class: .active
      if (isCertainButtonAlreadyActive) {
        isCertainButtonAlreadyActive.classList.remove("active");
        isCertainButtonAlreadyActive.classList.add("link-dark");
      }

      clickedElement.className += " active";
      clickedElement.classList.remove("link-dark");
    }
  }
}
