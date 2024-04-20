import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { UserListComponent } from './features/dashboard/user-list/user-list.component';
import { AddUserComponent } from './features/dashboard/add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { EditUserComponent } from './features/dashboard/edit-user/edit-user.component';
import { CoreHeaderComponent } from './core/components/core-header/core-header.component';
import { DocumentListComponent } from './features/document/document-list/document-list.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
    CoreHeaderComponent,
    DocumentListComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true
    },
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
