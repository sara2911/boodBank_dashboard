import { snapshotChanges } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  user:any;
   userAutho:any ;

  constructor(public serve:ServicesService , public _autho:AuthService){
   
   }

  ngOnInit(): void {
    // this.ourValidation=new FormGroup({
    //   name: new FormControl("",Validators.required),
    //   pass: new FormControl('',[Validators.required]),
    //   email:new FormControl('',[Validators.required,Validators.email])
    // });

    this.id=JSON.parse(localStorage.getItem('user')||'').uid;
    console.log(this.id,"id from localstorage");


    // this.userAutho=this._autho.afAuth.currentUser.then((_user)=>{
    //   _user?.uid;
    //   console.log(_user)
    //   console.log(this.id,"jjjjjjjj")
    

    // }).then(()=>{   

    this.serve.getAllAdmin().orderByKey().equalTo(this.id).on('value',(snap)=>{
      snap.forEach((child)=>{
    this.user=child.val();
      })
    })
    // })
  

 
}
update(updateName:any,updateEmail:any ){
  
  /////////////// update in Authentction ////////////////

   const user=this._autho.afAuth.currentUser.then((_user)=>{
    _user?.updateEmail(updateEmail)
        .catch((error: any) => {
            // An error occurred
            console.log(error)
            // ...
          });
////////////////

  //  _user?.updateProfile({
  //     displayName:updateName ,
  //     photoURL: "https://example.com/jane-q-user/profile.jpg"
  //   }).then(function() {
  //     // Profile updated successfully!
  //     // "Jane Q. User"
  //     // var displayName = user.displayName;
  //     // // "https://example.com/jane-q-user/profile.jpg"
  //     // var photoURL = user.photoURL;
  //   }, function(error) {
  //     // An error happened.
  //   });


////////////////////// update in database/////////////////////
        }).then(()=>{
          console.log(updateName,updateEmail,"hhhhh")
          this.serve.getAllAdmin().child(this.id).update({
            displayName:updateName,
              email:updateEmail
          }) 
              }).then(()=>{
                this._autho.afAuth.authState.subscribe((user)=>{
                  console.log(user)
       if (user){
       this.user=user;
       console.log(this.user)
    localStorage.setItem('user',JSON.stringify(this.user));
    // JSON.parse(localStorage.getItem('user'));
    // console.log(this.userData)
  } else {
    console.log("false")
    localStorage.setItem('user','');
    // JSON.parse(localStorage.getItem('user')||'');
  }
})
              localStorage.setItem('user',this.user);

              })
        console.log(user)
      
    ////////////////////////////

 



}
deleteAcount(id:any){
  const user =this._autho.afAuth.currentUser.then((user)=>{
user?.delete()

    // User deleted.
  })
  .catch((error:any) => {
    alert(error)
    // An error ocurred
  }).then(()=>{
    this.serve.getAllAdmin().child(id).remove().then(()=>{
      console.log('delete from collection')
    })
  })
  this._autho.SignOut();
}


}
