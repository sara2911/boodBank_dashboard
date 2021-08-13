import { ServicesService } from '../services/apiserve/services.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authoServices/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
admin:any;
repots:any[]=[];
countrepo:any=0;
  constructor(
    public serve:ServicesService,public _Router:Router,
    public  _authService: AuthService) { }

  ngOnInit(): void {
    // this.serve.btn_deletrepo=true
   var data=JSON.parse(localStorage.getItem('user')||'').email
    console.log(data)
    this.admin=data[0]
    console.log(this.admin);
    this.serve.getAllAdmin().child('Report').on('value',(snap)=>{
      this.repots=[];
      this.countrepo=0;
      snap.forEach(child => {
        this.countrepo+=1;
        console.log(child.val())
        this.repots.push(child.val())
        this.serve.num_repo=this.repots.length;

      });
      // this.serve.num_repo=this.countrepo;

  })
  // this.serve._repo=this.countrepo;
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
// getreports(){
// this.serve.getAllAdmin().child('Report').on('value',(snap)=>{
// snap.forEach(child => {
//   this.countrepo+=1;
//   this.repots.push(child.val)
// });

// })

// }

submitval(v:any){
  this.serve.btn_deletrepo=false;
  // this.serve.num_repo-=1;
  console.log(v);
if(this._Router.url!==`/UserInfo/${v}`
  )
  {console.log(true)

this._Router.navigateByUrl(`/UserInfo/${v}`).then(()=>{
  window.location.reload();

}) ;
  }
}

}
