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
btnNext=false;
btnPre=true;
_number:any=1;
  constructor(
    private ourService:ServicesService,
    public rout:Router) {

     }
    //  limitToFirst(5)
  ngOnInit(): void {
    this.ourService.filterday=true;
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
        this._number=5;
        this.users=this.arr;
        this.allUser[this.page]=this.arr;
      })


}

getmore(){
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
  console.log('aRR',this.arr);

  if(this.arr.length==0){
    console.log('null');
    this.btnNext=true;
    this.btnPre=false
  }
  else{
    this.page+=1;

  this.users=this.arr;
  this.allUser[this.page]=this.users;
  this.btnPre=false
  }
})
// this._number

  }
  getResult_search(){
    this.btnPre=false;
    this.btnNext=true;
     let arr: any[]=[];

    let g =this.ourService.getOptionGovern();
    if(g){
      console.log(g)

    }
    console.log(g)
    this.ourService.getusersInGovern().equalTo(g).once('value',(snap)=>{
  snap.forEach(childSnap => {
    let val=childSnap.val()
     arr.push(val)
  
});
    }).then((res)=>{
      this.users=arr
      console.log(this.users);
      // window.location.reload();
    })
  }

 

  bgcolor(){
    return this.ourService.mood;

  }

  next(){
   

     if(this.allUser[this.page+1]==null){
      //  console.log(this.users,"true")
      this.getmore()
     }
     else{
       this.page=this.page+=1;
       this.users=this.allUser[this.page]
     }

  }
  pre(){
    this.page-=1;
  if(this.page<=1){
     this.btnPre=true;
     this.btnNext=false;
    //  this.users=this.allUser[this.page];
    }
    {
     this.users=this.allUser[this.page]};

  }
 
  userinfo(e:any){

  this.ourService.getAllUser().orderByChild('email').equalTo(e)
  .once('value',(snap)=>{
    snap.forEach((child)=>{
      this.userKey=child.key
       console.log(child.key)

    })
  }).then(()=>{
    this.rout.navigateByUrl(`/UserInfo/${this.userKey}`)
  
    })
  
  
}
userKey:any;
}
