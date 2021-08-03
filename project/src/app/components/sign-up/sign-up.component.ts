import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../component/services/authoServices/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../../component/services/apiserve/services.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  ourValidation=new FormGroup({
    name: new FormControl("",Validators.required),
    pass: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email])
  });
  constructor(
     public authService: AuthService ,
     public ourserve :ServicesService ,
      public route:Router) { }

  ngOnInit(): void {
  }
  get NameValid(){
    return this.ourValidation.controls.name.valid;
  }
  get passValid(){
    return this.ourValidation.controls.pass.valid;
  }
  get EmailValid(){
    return this.ourValidation.controls.email.valid;
  }
  submit(){
    if(this.ourValidation){
      
    }
  }
}
