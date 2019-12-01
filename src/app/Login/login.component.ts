import {Component} from '@angular/core';
import { userManagementService } from '../Services/userManagement.service';
import { userServices } from '../Models/userServices.model';
import { AuthService } from '../Services/AuthService.service';
import { Router } from '@angular/router';

@Component(
    {
        selector:'app-login',
        templateUrl:'./login.component.html',
        styleUrls:['./login.component.css']
    }
)

export class LoginComponent{

    isServiceListAvailable:boolean;
    constructor(private userService:userManagementService,private authService:AuthService ,private router: Router)
    {}

    login()
    {
        this.getCommonServices();
    }
    getCommonServices()
    {
        this.userService.getAllUserServices().subscribe((data:userServices[]) =>{
            console.log(data);
            this.authService.setUserServiceList(data);
            this.isServiceListAvailable=true;
            this.router.navigate(['/dashBoard']);
        });
    }
}