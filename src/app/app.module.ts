import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { UserListComponent } from './features/dashboard/user-list/user-list.component';
import { AddUserComponent } from './features/dashboard/add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditUserComponent } from './features/dashboard/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
