import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { User } from './../../shared/services/user';
import { AuthService } from '../services/authoServices/auth.service';
import { ServicesService } from 'src/app/component/services/apiserve/services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ourValidation:any;
  id:any;
  user:any
  // _user:any;
  //  user:any = this._autho.afAuth.currentUser;
  //  name:any
  //   email:any;
  //   photoUrl:any; uid:any;
  //   emailVerified:any
  constructor(public serve:ServicesService , public _autho:AuthService) {
     this.id=this._autho.userData.uid;
    console.log(this.id)
   }

  ngOnInit(): void {
    this.ourValidation=new FormGroup({
      name: new FormControl("",Validators.required),
      pass: new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email])
    });
 this.serve.getAllAdmin().orderByKey().equalTo(this.id).once('value',(snap)=>{
   snap.forEach((child)=>{

this.user=child.val();
console.log(this.user)
   })
 })
}
update(u:any){
  console.log(u)
  console.log(this._autho.userData)
  
  let id=this._autho.userData.email;
  console.log(id)
 
}

}