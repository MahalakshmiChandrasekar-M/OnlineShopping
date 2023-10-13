import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './Login.service';

@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate {
  public user = localStorage.getItem("userame")
  constructor(private service:LoginService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean
    {
      if(!this.service.isUserLoggedIn())
      {
        alert("You are not logged in to view the page");
        this.router.navigate(["Login"],{queryParams:{retUrl:route.url}}); 
        return false;
      }
    return true;
    }

}
