import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { userServices } from "../Models/userServices.model";

@Injectable()
export class userManagementService{

    constructor(private http:HttpClient){}
    
    getUserList(){
        console.log("inside getUserList..");
        return this.http.get("../../assets/userList.json");
    }

    submitUserDetails(user){
        return this.http.post("http://localhost:8081/user/create",user);
    }

    updateUserDetails(user)
    {
        return this.http.post("http://localhost:8081/user/update",user);
    }

    updateUserDocUrl(user,docUrl,httpOptions)
    {
        return this.http.post(`http://localhost:8081/user/updateDoc/${user.reqId}`,docUrl);
    }

    updateUserServices(reqId,services)
    {
        return this.http.post(`http://localhost:8081/user/addService/${reqId}`,services);
    }

    updateUserServiceByAdmin(userId,services)
    {
        return this.http.post(`http://localhost:8081/manageUser/addServices/${userId}`,services);
    }

    getAllUserServices()
    {
        return this.http.get("http://localhost:8081/services/getServices");
    }

    getInboundRequest()
    {
        return this.http.get("http://localhost:8081/workFLow/getActiveWorkFLows/1")
    }

    approveRequest(request)
    {
        return this.http.post("http://localhost:8081/workFLow/approve",request);
    }

    getRequestDetails(id)
    {
        return this.http.get(`http://localhost:8081/workFLow/getRequestDetails/${id}`)
    }

    rejectRequest(request)
    {
        return this.http.post("http://localhost:8081/workFLow/cancel",request);
    }
}