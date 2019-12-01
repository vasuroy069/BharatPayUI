import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { userManagementService } from "../../Services/userManagement.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { userDetails } from "../../Models/userDetails.model";

@Component({
    templateUrl:"./InBoundRequestDetails.component.html"
})
export class InBoundRequestDetailsComponent implements OnInit{

    @Output() approveEvent=new EventEmitter<any>()
    workFlowId:any;
    user:any;
    constructor(public bsModalRef: BsModalRef,private userService:userManagementService){}
    ngOnInit()
    {
        console.log("passed data is::"+this.workFlowId);
        this.userService.getRequestDetails(this.workFlowId).subscribe((data)=>{
            this.user=data;
            console.log("data :"+JSON.stringify(this.user));
        })
    }

    approve(request){
        console.log("approve::"+request)
        this.approveEvent.emit(request);
    }
        
    
}