import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { HeaderComponent } from './Header/header.component';
import { DropdownComponent } from './Header/actionDropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
// RECOMMENDED
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DashBoardComponent } from './DashBoard/dashBoard.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './Guards/authGuard.guard';
import { AuthService } from './Services/AuthService.service';
import { BsModalService, ModalContainerComponent, ModalBackdropComponent } from 'ngx-bootstrap/modal';
import { createUser } from './Forms/userCreation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { userListComponent } from './userManagement/userList.component';
import { userManagementService } from './Services/userManagement.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { userDetailsComponent } from './userManagement/userDetails.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { FileUploadModule } from 'ng2-file-upload';
import { TokenInterceptor } from './Interceptor/HttpInterceptors.interceptors';
import { InBoundRequestComponent } from './userRequestManagement/InBoundRequestManagement/InBoundRequest.component';
import { Resolver } from './Services/Resolver';
import { InBoundRequestDetailsComponent } from './userRequestManagement/InBoundRequestManagement/InBoundRequestDetails.component';
import { LoaderComponent } from './Loader/LoaderComponent.component';
import { LoaderService } from './Loader/LoaderService.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DropdownComponent,
    DashBoardComponent,
    ModalBackdropComponent,
    ModalContainerComponent,
    createUser,
    userListComponent,
    userDetailsComponent,
    InBoundRequestComponent,InBoundRequestDetailsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FileUploadModule,
    MatCardModule,
    MatButtonModule
  ],
  entryComponents:[ModalBackdropComponent,ModalContainerComponent,createUser,userDetailsComponent,InBoundRequestDetailsComponent],
  providers: [LoaderService,AuthGuard,AuthService,BsModalService,userManagementService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },Resolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
