import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { userManagementService } from "./userManagement.service";
import { Injectable } from "@angular/core";

@Injectable()
export class Resolver implements Resolve<Observable<string>>
{
    constructor(private userService:userManagementService)
    {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<any>|Promise<any>|any {
        return this.userService.getInboundRequest();
      }
    }
