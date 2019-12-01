import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { DashBoardComponent } from './DashBoard/dashBoard.component';
import { AuthGuard } from './Guards/authGuard.guard';
import { userListComponent } from './userManagement/userList.component';
import {MatStepperModule} from '@angular/material/stepper';
import { InBoundRequestComponent } from './userRequestManagement/InBoundRequestManagement/InBoundRequest.component';
import { Resolver } from './Services/Resolver';
const routes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
    {path:'login',component:LoginComponent},
    {path:'dashBoard',canActivate:[AuthGuard],component:DashBoardComponent},
    {path:'dashBoard/userList',canActivate:[AuthGuard],component:userListComponent},
    {path:'dashBoard/request',canActivate:[AuthGuard],component:InBoundRequestComponent,resolve:{request:Resolver}}
    
];
@NgModule({
  imports: [RouterModule.forRoot(routes),MatStepperModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }