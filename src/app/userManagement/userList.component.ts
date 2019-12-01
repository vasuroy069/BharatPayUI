import { Component, OnInit } from "@angular/core";
import { userDetails } from "../Models/userDetails.model";
import { userManagementService } from "../Services/userManagement.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { userDetailsComponent } from "./userDetails.component";

@Component({
    selector:'user-list',
    templateUrl:'userList.component.html',
    styleUrls:['./userList.component.css']
})
export class userListComponent implements OnInit{
    bsModalRef:BsModalRef;
    userList:any;
    constructor(private userService:userManagementService,private bsModalService:BsModalService){}
    ngOnInit(): void {
        console.log("Inside ngOnit");
        this.userService.getUserList().subscribe(
           data => {console.log("data is ::"+data);this.userList=data;}
        )

    console.log("user list is::"+this.userList);
    }

    userDetailsModal(user:userDetails){
        console.log("user is ::"+JSON.stringify(user));
        const initialState = {
            user:user,
            title: 'Modal with component'
          };
          this.bsModalRef = this.bsModalService.show(userDetailsComponent, {initialState});
          this.bsModalRef.content.closeBtnName = 'Close';
    }
    
}