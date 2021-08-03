// import { AuthoGuard } from './autho.guard';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthService } from '../services/authoServices/auth.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthoGuard implements CanActivate {
  constructor(private _serve:AuthService ,
    private rout:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
   
   let logged=this._serve.isLoggedIn;
   console.log(logged)
    return true;
    
    
   

  
 
  
 
   }
}

 // console.log(logged)
    // this.rout.navigateByUrl('/SignIn');
    // return false