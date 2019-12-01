export class userDetails
{
    reqId:number;
    requesterId:number;
    requesterName:number;
    userName:string;
    emailId:string;
    phoneNumber:number;
    altPhoneNumber:number;
    country:string;
    state:string;
    district:string;
    city:string;
    pincode:number;
   // addressDetails:Address;
    addressDetails:string;
    occupation:string;
    createdBy:number;
    createdOn:Date;
    updatedBy:number;
    updatedOn:Date;
    fatherName:string;
    status:string;
    adminStatus:string;
    role:string;
    workflow:string;
    docUrl:string;
    //services:Service;

}

class Address{
    address:string;
    district:string;
    city:string;
    state:string;
    country:string;
    pincode:string;
}

class Service{
    haveBillPaymentAccess:boolean;
    haveHotelAccess:boolean;
}