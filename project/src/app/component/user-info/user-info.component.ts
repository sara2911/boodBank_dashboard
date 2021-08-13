// import { snapshotChanges } from '@angular/fire/database';
import { AuthService } from './../services/authoServices/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/apiserve/services.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userId:any;
  userinfo:any;
  posts:any[]=[];
  _keydelete:any;
    constructor(public ourActivated:ActivatedRoute ,
      public _utho: AuthService, public ourserve:ServicesService) { 
      // this.userId=ourActivated.snapshotChan.params.type;
  
      console.log(this.userId)
  
    }
  ngOnInit(): void {
    // this.ourserve.btn_deletrepo=true

    this.userId=this.ourActivated.snapshot.params.type;

    this.ourserve.getUserById(this.userId).on('value',(snapshotChanges)=>{

snapshotChanges.forEach((childsnap:any)=>{
        console.log(childsnap.val());
        this.userinfo=childsnap.val();

})
    })


    this.ourserve.getAllPosts().orderByChild('userID').equalTo(this.userId)
.on('value', (snapshotChanges) => {
  snapshotChanges.forEach((childsnapshotChanges) => {
    var childData=childsnapshotChanges.val();
    this.posts.push(childData);
})

})
  }
 deleteuser(){
   this.ourserve.addInblock().push(this.userinfo.email)
  this.ourserve.deleteUser(this.userId);
  this.userinfo='';
  
 

 } 
 deletpost(id:any,index:any){

  // this.ourserve.getAllPosts().orderByKey().equalTo(id)
  // .once('value',(snap)=>{
  //   snap
  //   .forEach((childsnap)=>{
  //     this._keydelete=childsnap.key
  //     // console.log(this._keydelete)
  //   console.log(childsnap.val())
  // })
  
  // }).then(()=>{
  //   console.log(this._keydelete)
  
  this.ourserve.getAllPosts().child(id).remove()
  // })
  console.log(index)
  let x=this.posts.splice(index,1)
  console.log(x,"sss")
  console.log(this.posts)
  
  
  }
  deleterepo(){
    let _key:any;
    this.ourserve.getreports(this.userId).once('value',(snap)=>{
      snap.forEach((child)=>{
        _key=child.key
        console.log(_key)
      })
    }).then(()=>{
      this.ourserve.deleterepo().child(_key).remove()
    })
    this.ourserve.num_repo-=1;

    
this.ourserve.btn_deletrepo=true;
  }
  

}

  
