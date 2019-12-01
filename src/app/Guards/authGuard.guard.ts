import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "../Services/AuthService.service";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate
{

    constructor( private _router: Router,private _authService:AuthService){}

    canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean
    {
        if(this._authService.isLoggedIn())
        {
            return true;
        }
        else
        this._router.navigate(['/login']);
        return false;
    }
}