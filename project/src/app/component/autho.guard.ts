import { Routes } from '@angular/router';
// import { AuthoGuard } from './autho.guard';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthService } from './services/auth.service';
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
   
   let logged=this._serve.isLoggedIn
   if(logged){
    return true;
   }
//    else {
// console.log(logged)
//   //   // this.rout.navigate(['/Home']);
    return true

//    }
 
  
 
   }
}