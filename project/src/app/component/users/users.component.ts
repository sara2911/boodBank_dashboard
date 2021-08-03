// import { UserDetailsComponent } from './../user-details/user-details.component';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ServicesService } from '../services/apiserve/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users:any[]=[];
allUser:any[]=[];
countuser:any=0;
lastKey:any;
page:any=1;
arr:any[]=[];
  constructor(
    private ourService:ServicesService,
    public rout:Router) {

     }

  ngOnInit(): void {
    this.ourService.getAllUser().limitToFirst(5).once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              this.countuser+=1
              // var childKey = childSnapshot.key;
              // this.postKey.push(childKey)
              this.lastKey=childSnapshot.key
              var childData=childSnapshot.val()
              this.arr.push(childData)
        })
        
      }).then(()=>{
        this.users=this.arr;
        this.allUser[this.page]=this.arr;
      })


}

getmore(){
  this.page+=1;
  this.arr=[];
  this.ourService.getAllUser().orderByKey().startAfter(this.lastKey).limitToFirst(5).once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      this.countuser+=1
      // var childKey = childSnapshot.key;
      // this.postKey.push(childKey)
      this.lastKey=childSnapshot.key
      var childData=childSnapshot.val()
      this.arr.push(childData)
})

}).then(()=>{
  this.users=this.arr;
  this.allUser[this.page]=this.users;
})

  }
  getResult_search(){
     let arr: any[]=[];

    let g =this.ourService.getOptionGovern();
    console.log(g)
    this.ourService.getusersInGovern().equalTo(g).once('value',(snap)=>{
  snap.forEach(childSnap => {
    let val=childSnap.val()
     arr.push(val)
  
});
    }).then((res)=>{
      this.users=arr
      console.log(this.users)
      // window.location.reload();
    })
  }

 

  bgcolor(){
    return this.ourService.mood;

  }
 

}
