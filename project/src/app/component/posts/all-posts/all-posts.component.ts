import { ServicesService } from './../../../services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  
 
// ////////

posts:any[]=[];
lastvalue:any="";
 lastkey:any;
indexpage:any;
page:any
 btn1:any
 active_page:any=1
 valBtn:any=''
 arrPage:any[]=[]; //each page have its posts
 postsInpage:any[]=[];
 disable_next:any=false;
 disable_pre:any=false;
 postofUserid:any[]=[]
  constructor(public serve:ServicesService ) { }

  ngOnInit(): void {
this.serve.getAllPosts().orderByKey().limitToFirst(2)
.once('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    var childData=childSnapshot.val();
    this.postsInpage.push(childData);
    this.lastkey=childSnapshot.key
})
this.arrPage[0]=this.postsInpage;
this.posts=this.arrPage[0];
console.log(this.posts);
})
    
  }

  
select_Page(_page: any) {

    this.page=_page-1
    this.active_page=_page;
    this.checkbtn()
    // console.log(this.posts)
    // console.log(this.arrPage[this.page])
    if(this.arrPage[this.page]==null){
      console.log(this.arrPage[this.page])
    this.serve.getAllPosts()
    .orderByKey().startAt(this.lastkey).limitToFirst(2)
    .once('value', (snapshot) => {
      
        //reset values
        this.lastkey='' 
        this.postsInpage=[]
    snapshot.forEach((childSnapshot) => {
    console.log(this.lastkey,"start")

 


    var childData=childSnapshot.val() //get value
      this.lastkey=childSnapshot.key;//get key
    this.postsInpage.push(childData)
    console.log(this.lastkey, "after")
})
this.pushposts(this.postsInpage,this.page)


})
 this.posts=this.arrPage[_page] //at the end final result [posts] is specfic  by pages

}  

    this.posts=this.arrPage[this.page] //at the end final result [posts] is specfic  by pages
  // _page=false
      // console.log( this.posts)

  }




 pushposts(_postsInpage:any,_page:any){
this.posts=[];
  this.arrPage[_page]=this.postsInpage
  console.log(this.arrPage[_page])
  console.log( _page,"",this.arrPage)
  
  console.log(_page,"",this.arrPage[1])
  this.posts=this.arrPage[_page]
  }




  next_btn(){
    this.active_page+=1;
    if(this.active_page>=5){
      this.active_page=5
      this.disable_next=true;
      this.disable_pre=false;

    }
    this.select_Page(this.active_page)
  }

  btn_prev(){
    this.active_page-=1;
 if(this.active_page<=1){
    this.disable_next=false;
    this.disable_pre=true;
    this.active_page=1;
 }
    this.select_Page(this.active_page)
  }
getmood(){
  return this.serve.mood;

}
checkbtn(){
  if(this.active_page<=1){
    this.disable_next=false;
    this.disable_pre=true;
    this.active_page=1;
 }
  if(this.active_page>=5){
  this.active_page=5
  this.disable_next=true;
  this.disable_pre=false;

}
}

deletpost(user_id:any){
console.log(user_id)
 let v=this.serve.getAllPosts().orderByChild('userID').equalTo(user_id).once('value',(snap)=>{
  snap.forEach((childsnap)=>{
    
    this.postofUserid.push(childsnap.val());

  })
  console.log(this.postofUserid)
})
 console.log(v);
}
}
