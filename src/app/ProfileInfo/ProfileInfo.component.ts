import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { LoginService } from '../Login.service';
import { Router } from '@angular/router';
import { AddToService } from '../AddTo.service';
//import { LoggerService } from '../Logger.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-ProfileInfo',
  templateUrl: './ProfileInfo.component.html',
  styleUrls: ['./ProfileInfo.component.css']
})
export class ProfileInfoComponent implements OnInit {

  constructor(private logger:NGXLogger, private db:DbService,private loginService:LoginService,private router:Router, private addTo :AddToService) { }

  userInfo:any="";
  retHome:any="";
  yourOrders="Your Orders";
  ordersHistory="Orders History";
  cancelledOrders="Cancelled Orders";
  contactUs="Contact Us";
  ngOnInit() {
    this.db.getCurrentUser().subscribe(data=>
      {
        this.userInfo=data;
      })
  }

  onLogout(UserInfo:any)
  {
    this.logger.info("logout profile");
    this.loginService.logoutUser();
    this.db.deleteCurrentUser(UserInfo).subscribe(data=>
      {
        this.logger.info("current user removed");
      })

    this.router.navigate([this.retHome]);
  }

  clickYourOrders()
  {
    this.addTo.optionChoosen(this.yourOrders);
  }

  clickOrdersHistory()
  {
    this.addTo.optionChoosen(this.ordersHistory);
  }

  clickCancelledOrders()
  {
    this.addTo.optionChoosen(this.cancelledOrders);
    //this.router.navigate(["OrdersHistory"])
  }

  clickContactUs(){
  this.addTo.optionChoosen(this.contactUs);
  //this.router.navigate(["ContactUs"])
  }

}
