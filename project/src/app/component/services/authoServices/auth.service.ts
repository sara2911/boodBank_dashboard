import { Injectable, NgZone } from '@angular/core';
import { User } from "../../../shared/services/user"
// import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFireDatabase } from '@angular/fire/database';// AngularFireList
 
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    // public afs: AngularFirestore,   // Inject Firestore service
    public afs: AngularFireDatabase,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.userData =user;
        localStorage.setItem('user',JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')||'');
        // console.log(this.userData)
      } else {
        localStorage.setItem('user','');
        // JSON.parse(localStorage.getItem('user')||'');
      }
    })

  }

  // Sign in with email/password
  SignIn(email:any, password:any) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['Home']);
        });
        // this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email:any, password:any,name:any) {
    return this.afAuth.createUserWithEmailAndPassword(email,password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user,name);
        this.router.navigate(['/SignIn'])
      }).catch((error) => {
        window.alert(error.message)
        // this.router.navigate(['/SignIn'])
      })
  }
  

  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser.sendEmailVerification()
  //   .then(() => { 
  //      this.router.navigate(['Home']);
  //   }
  
  //   //   this.router.navigate(['verify-email-address']);
  //   // })
  //   // .then(){
  //   //   this.router.navigate(['Home'])
  // //   }
  // // }
  // }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail:any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn():boolean {

    const _user =JSON.parse(localStorage.getItem('user')||'');
    console.log(_user,"islogin");
    return (_user !==null)?true:false;
    //  && _user.emailVerified !== false
  }

  // Sign in with Google
  // GoogleAuth() {
    // auth.GoogleAuthProvider()
    // return this.AuthLogin(GoogleAuthProvider());
  // }

  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['Home']);
        })
      this.SetUserData(result.user,'');
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user:any,name:any){
    console.log(name,"name")
    const userRef =this.afs.database.ref(`/Admin/${user.uid}`);
    const userData:User={
      uid: user.uid,
      email: user.email,
      displayName:name,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }

    // return userRef.push(userData)
    return userRef.set(userData)
    //   , {merge:true
    // })

    
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      // this.router.navigate(['sign-in']);
    })
  }

}


















function GoogleAuthProvider(): any {
  throw new Error('Function not implemented.');
}

