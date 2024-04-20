import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './features/dashboard/user-list/user-list.component';
import { DocumentListComponent } from './features/document/document-list/document-list.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'document',
    component: DocumentListComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
