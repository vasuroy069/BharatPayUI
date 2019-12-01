import { Component, Input } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { userDetails } from "../Models/userDetails.model";

@Component({
    selector:'user-details',
    templateUrl:'./userDetails.component.html'
})
export class userDetailsComponent{

    @Input() user:userDetails
    constructor(public bsModalRef: BsModalRef) {
        console.log("value is::"+JSON.stringify(bsModalRef)+"  "+this.user);
    }
}