import { Component } from "@angular/core";
import {FormControl, FormGroup,FormBuilder, Validators } from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { userDetails } from "../Models/userDetails.model";
import { FileUploader } from 'ng2-file-upload';
import { userManagementService } from "../Services/userManagement.service";
import { AuthService } from "../Services/AuthService.service";
import { MatStepper } from "@angular/material";
import { HttpHeaders } from "@angular/common/http";
import { Jsonp } from "@angular/http";
import { userServices } from "../Models/userServices.model";

@Component({
    selector:'user-create',
    templateUrl:'./userCreation.component.html',
    styleUrls:['./userCreation.component.css']
})
export class createUser{
    user:userDetails;
    addUserForm:FormGroup;
    userServiceForm:FormGroup;
    // for file uploader
    uploader:FileUploader;
    hasBaseDropZoneOver:boolean;
    hasAnotherDropZoneOver:boolean;
    response:string;
    isFormSubmitting:boolean;
    isUserDetailsSubmitted:boolean;
    // Flags for service assignment
    haveFlightService:boolean=true;
    userSelectedServices:userServices[];
    //
    //URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
    constructor(private fb:FormBuilder,public bsModalRef: BsModalRef,private userService:userManagementService,public auth: AuthService)
    {
        this.userSelectedServices=[];
        //this.userSelectedServices=JSON.parse(JSON.stringify((this.auth.getUserServiceList())));
        this.user=new userDetails();
        this.generateaddUserForm();
        // for file uploader
        
        this.uploader = new FileUploader({
            url: 'http://www.isouvik.com:9191/api/master/upload/docs/manish@gmail.com',
            //authToken:`Bearer ${this.auth.getToken()}`,
            disableMultipart: false, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
            // formatDataFunctionIsAsync: true,
            // formatDataFunction: async (item) => {
            //   return new Promise( (resolve, reject) => {
            //     resolve({
            //       name: item._file.name,
            //       length: item._file.size,
            //       contentType: item._file.type,
            //       date: new Date()
            //     });
            //   });
            // }
          });

        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
    
        this.response = '';
        this.uploader.onBeforeUploadItem=(item)=>{
            item.withCredentials = false;
        }
        this.uploader.response.subscribe( res => {
            var url=res.url;var parsedUrl=JSON.parse(res);
            console.log("data is:"+JSON.stringify(res)+"::parsed data is:"+parsedUrl+"::url is :"+parsedUrl.url);this.user.docUrl=parsedUrl.url;this.updateDocUrl(this.user,this.user.docUrl);
        } 
        );
    }

    generateaddUserForm()
    {
        this.addUserForm=this.fb.group(
            {
                userName:['',Validators.required],
                emailId:['',Validators.required],
                phoneNumber:['',Validators.required],
                altPhoneNumber:['',Validators.required],
                addressDetails:['',Validators.required],
                    district:['',Validators.required],
                     city:['',Validators.required],
                     state:['',Validators.required],
                     country:['',Validators.required],
                     pincode:['',Validators.required],

                occupation:['',Validators.required],
                fatherName:['',Validators.required],
                requesterId:'111',
                role:'RETAILER',
                // addressDetails:this.fb.group({
                //     address:['',Validators.required],
                //     district:['',Validators.required],
                //     city:['',Validators.required],
                //     state:['',Validators.required],
                //     country:['',Validators.required],
                //     pincode:['',Validators.required]
                // }),
                // services:this.fb.group({
                //     haveBillPaymentAccess:[true],
                //     haveHotelAccess:[true]

                // })

            }
        )

        this.userServiceForm=this.fb.group(
            {
                services:this.fb.array(
                    this.auth.getUserServiceList()
                )
            }
        )

        console.log(this.userServiceForm);
    }

    // addUserForm=new FormGroup(
    //     {
    //         name:new FormControl()
    //     }
    // );

    submitForm(stepper: MatStepper)
    {
        var reqId;
        this.isFormSubmitting=true;
        if(this.user.reqId)
        {
            reqId=this.user.reqId;
        }
        this.user=this.addUserForm.value;
        this.user.reqId=reqId;
        console.log(this.user+"||"+JSON.stringify(this.user));
        if(this.user.reqId)
        {
            this.userService.updateUserDetails(this.user).subscribe((data:any)=>{
                console.log("data is :"+JSON.stringify(data)+"|"+data.message);
                var msg=data.message;
                if(msg.indexOf("Successful")!=-1)
                {   
                    this.user=data.user;
                    this.isUserDetailsSubmitted=true;this.isFormSubmitting=false;
                    stepper.next();
                    console.log("user updation Successful::"+JSON.stringify(this.user));
                }
            });
        }
        else{
            //TODO for admin
            this.userService.submitUserDetails(this.user).subscribe((data:any)=>{
                console.log("data is :"+JSON.stringify(data)+"|"+data.message);
                var msg=data.message;
                if(msg.indexOf("Successful")!=-1)
                {   
                    this.user=data.user;
                    this.isUserDetailsSubmitted=true;this.isFormSubmitting=false;
                    stepper.next();
                    console.log("user Creation Successful::"+JSON.stringify(this.user));
                }
            });
        }
        
    }

    reset()
    {
        this.addUserForm.reset();
    }

    // File uploader :

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
      }
     
    //   public fileOverAnother(e:any):void {
    //     this.hasAnotherDropZoneOver = e;
    //   }

    updateDocUrl(user,url)
    {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json,text/plain',
              })
              
          };
          this.userService.updateUserDocUrl(this.user,url,httpOptions).subscribe((data)=>{console.log("after updating url::"+data),this.response="Successful Update"})
    }

    modifyServiceList(service)
    {
        if(this.userSelectedServices.indexOf(service)!=-1)
        {
            this.userSelectedServices.splice(this.userSelectedServices.indexOf(service));
        }
        else
        {
            this.userSelectedServices.push(service);
        }
        console.log(this.userSelectedServices);
    }

    saveUserServices()
    {
        this.userService.updateUserServices(this.user.reqId,this.userSelectedServices).subscribe((data)=>{
            console.log("after saveUserServices ::"+data);
        })
    }

    
}
