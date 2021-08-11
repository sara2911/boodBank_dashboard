import { OnInit } from '@angular/core';
// import { AuthoGuard } from './autho.guard';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthService } from '../services/authoServices/auth.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthoGuard implements CanActivate {
  logged:any;
  user:any;
  constructor(private _serve:AuthService ,
    private rout:Router
    ){}
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
    this.user=localStorage.getItem('user'||'')
    console.log(this.user)
  // this.logged=this._serve.isLoggedIn()
  //  console.log(this.logged)
   if(this.user!==''){
     console.log("true")
     return true;
   }
   else{
this.rout.navigateByUrl('SignIn')
console.log(this.logged);


 return false
   }
  }
   

  
 
  
 
   }


 // console.log(logged)
    // this.rout.navigateByUrl('/SignIn');
    // return false