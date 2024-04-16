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
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { EditUserComponent } from './features/dashboard/edit-user/edit-user.component';
import { CoreHeaderComponent } from './core/components/core-header/core-header.component';
import { DocumentListComponent } from './features/document/document-list/document-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
    CoreHeaderComponent,
    DocumentListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
