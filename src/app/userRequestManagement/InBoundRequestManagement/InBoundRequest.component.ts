import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { userManagementService } from "../../Services/userManagement.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { InBoundRequestDetailsComponent } from "./InBoundRequestDetails.component";

@Component({
    selector:"user-Inbound-Request",
    templateUrl:"./InBoundRequest.component.html",
    styleUrls:["./InBoundRequest.component.css"]
})
export class InBoundRequestComponent implements OnInit{
    workFlowObject:any;
    data:any;
    bsModalRef:BsModalRef;
    config = {
        backdrop: true,
        ignoreBackdropClick: true
      };
    constructor(private route:ActivatedRoute,private userService:userManagementService,private bsModalService:BsModalService){}

    ngOnInit(){
        this.data=this.route.snapshot.data;
        console.log("data is ::"+JSON.stringify(this.data));
    }

    getWorkFlowDetails(workFlow:any)
    {
        this.workFlowObject=workFlow;
        this.openModalWithComponent(workFlow.workFlowId);
    }

    approveRequest(request)
    {
        this.workFlowObject=request;
        this.userService.approveRequest(this.workFlowObject).subscribe((data)=>{
            console.log("Approved Data is ::"+JSON.stringify(data));
        });
    }

    declineRequest(request)
    {
        this.userService.rejectRequest(request).subscribe((data)=>{
            console.log("Rejected data is::"+JSON.stringify(request));
        })
    }

    openModalWithComponent(workFlowId:any) {
        console.log("inside modal ");
        const initialState={
            workFlowId:workFlowId
        };
        this.bsModalRef = this.bsModalService.show(InBoundRequestDetailsComponent,{initialState});
        this.bsModalRef.content.closeBtnName = 'Close';
        this.bsModalRef.content.approveEvent.subscribe(data =>{
            console.log("data received in parent component::"+data)
            this.approveRequest(data);
        })
      }
}