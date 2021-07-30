import { User } from './../../shared/services/user';
import { AuthService } from 'src/app/component/services/auth.service';
import { ServicesService } from 'src/app/services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public serve:ServicesService , public _autho:AuthService) { }

  ngOnInit(): void {

    const user =this._autho.afAuth.currentUser.then((result)=>{
      console.log(result)
    },);
    if (user!==null) {
      // The user object has basic properties such as display name, email, etc.
      // const displayName = user.displayName;
      // const email = user.email;
      // const photoURL = user.photoURL;
      // const emailVerified = user.emailVerified;
    
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      // const uid = user.uid;
    //   console.log(user.then((resut)=>{
    //     // resut?.email
    //     console.log(        resut?.email
    //       )
    //   }))
    // }

  }


}
}
  //////////////
  // uid: string;
  // email: string;
  // displayName: string;
  // photoURL: string;
  // emailVerified: boolean;