import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { createUser } from '../Forms/userCreation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'dash-board',
  templateUrl: './dashBoard.component.html',
  styleUrls:['./dashBoard.component.css']
})
export class DashBoardComponent {
  bsModalRef:BsModalRef;
  showUserModifyPanelFlag:boolean=false;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  constructor(private bsModalService:BsModalService,private router: Router){}

  openModalWithComponent() {
    this.bsModalRef = this.bsModalService.show(createUser, this.config);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  toggleFlag()
  {
    console.log("flag is::"+this.showUserModifyPanelFlag);
    this.showUserModifyPanelFlag=!this.showUserModifyPanelFlag;
  }

  getApprovalRequest()
  {
    this.router.navigate(['/dashBoard/request']);
  }
}
