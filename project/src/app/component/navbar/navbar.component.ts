import { ServicesService } from './../../services.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
admin:any
  constructor(
    private serve:ServicesService,
    public  _authService: AuthService) { }

  ngOnInit(): void {
   var data=JSON.parse(localStorage.getItem('user')||'').email
    console.log(data)
    this.admin=data[0]
    console.log(this.admin)
  }
logo:any='../../../assets/images/logo.jpg';
sun:any=this.serve.mood;
dark:any=!this.serve.mood

changmood(){
  // console.log( this.serve.mood ,this.sun, this.dark)
  this.serve.mood=!  this.serve.mood;
  this.sun=this.serve.mood;
this.dark=!this.serve.mood;


}


}
