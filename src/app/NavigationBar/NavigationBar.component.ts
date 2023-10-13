import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Login.service';

@Component({
  selector: 'app-NavigationBar',
  templateUrl: './NavigationBar.component.html',
  styleUrls: ['./NavigationBar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  searchQuery!: string;
  searchResults!: any[];

  /*searchProducts() {
    if (this.searchQuery)
    {
      this.addTo.searchProducts(this.searchQuery).subscribe((data) =>
      {
        this.searchResults = data;
        this.addTo.searchedProducts(this.searchResults);
      });
    }
    else
    {
      this.searchResults = [];
    }
  }*/

  loginStatus!:boolean;
  isAdminUser:boolean=false;
  ngOnInit() {
    this.loginStatus=this.loginService.isUserLoggedIn()
    this.isAdminUser=this.loginService.userType()
  }

}
