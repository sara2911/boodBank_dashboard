import { snapshotChanges } from '@angular/fire/database';
import { ServicesService } from '../../services/apiserve/services.service';
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
 postofUserid:any[]=[];
 governments:any= [
  'Alexandera',
  'Cairo',
  'Beheira',
  'Beni Suief',
  'Dakahlia',
  'Damietta',
  'Faiyuim',
  'Al-minya',
  'Asyut',
  'Aswan'
];
lengthbtn:any;
Days:any[]=[];
day(){
  for(let i=1;i<31;i++){
this.Days.push(i);
  }
}

_keydelete:any;
num:any=0;
btn_count:number[]=[1];
btn_hidden=false;
  constructor(public serve:ServicesService ) { }

  ngOnInit(): void {
    this.serve.filterday=false
    this.day()
this.serve.getAllPosts().orderByKey().limitToFirst(5)
.on('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    var childData=childSnapshot.val();
    this.postsInpage.push(childData);
    this.lastkey=childSnapshot.key
})
this.arrPage[0]=this.postsInpage;
this.posts=this.arrPage[0];
console.log(this.posts);
})
  //  console.log(this.lastkey) 
  }

  select_Page(_page:any){
    this.page=_page-1
    this.active_page=_page;
    this.checkbtn()
    console.log(this.page);
    console.log(this.arrPage[this.page]);
    if(this.arrPage[this.page]==null){
      // console.log(this.lastkey,"start");
      console.log("create new");
      console.log(this.arrPage[this.page]);
    this.serve.getAllPosts().orderByKey()
    .startAfter(this.lastkey).limitToFirst(5)
    .on('value', (snapshot) => { 
        //reset values
        // this.lastkey='' 
        this.postsInpage=[];
    snapshot.forEach((childSnapshot) =>{
    // console.log(this.lastkey,"start");
    var childData=childSnapshot.val() //get value
      this.lastkey=childSnapshot.key;//get key
    this.postsInpage.push(childData)
    // console.log(this.lastkey, "after")
})
// console.log(this.postsInpage.length,"length")
if(this.postsInpage.length!==0){

  // console.log(this.postsInpage.length,"add")
  this.num+=1;
this.btn_count.push(this.num);
this.lengthbtn=this.btn_count.length;
this.pushposts(this.postsInpage,this.page);
console.log(this.btn_count)
}
else if(this.postsInpage.length==0){
  console.log(this.postsInpage.length,"nodata");
        this.disable_next=true;

}
// this.pushposts(this.postsInpage,this.page)//return
})
 this.posts=this.arrPage[_page] //at the end final result [posts] is specfic  by pages
}  

    this.posts=this.arrPage[this.page] //at the end final result [posts] is specfic  by pages
  // _page=false
      // console.log( this.posts)

  }

 pushposts(_postsInpage:any,_page:any){
this.posts=[];
  this.arrPage[_page]=this.postsInpage;
  // console.log(this.arrPage[_page]);
  console.log( _page,"",this.arrPage);
  
  // console.log(_page,"",this.arrPage[1]);
  this.posts=this.arrPage[_page];
  }

  next_btn(){
    console.log("next befor",this.active_page)
    this.active_page+=1;
    if(this.active_page>=6){
      this.active_page=6
      // this.disable_next=true;
      this.disable_pre=false;

    }
    console.log("next after",this.active_page)
    this.select_Page(this.active_page)

  }

  btn_prev(){
    this.btn_hidden=false
    
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
  if(this.active_page>=6){
  this.active_page=6
  this.disable_next=true;
  this.disable_pre=false;

}
}

deletpost(id:any,index:any){

this.serve.getpostbykey().equalTo(id).once('value',(snap)=>{
  snap
  .forEach((childsnap)=>{
    this._keydelete=childsnap.key
    console.log(this._keydelete)
  console.log(childsnap.val())
})

}).then(()=>{
  console.log(this._keydelete)

this.serve.getAllPosts().child(this._keydelete).remove()
})
console.log(index)
let x=this.posts.splice(index,1)
console.log(x,"sss")
console.log(this.posts)


}



filtersearch(){
  this.btn_hidden=true;
  
  // this.active_page=0;
    let arr:any[]=[];
  let g=this.serve.getOptionGovern();
  let d=this.serve.getoptionDay();
  if(d<10){
    d='0'+d;
    console.log(d);
  }
  if(g){
  console.log(g,d,"ppppppppp");
   this.serve.getpostInGovern(g).once('value',(snap)=>{
    snap.forEach((childsnap)=>{
     arr.push(childsnap.val())
  })

  }).then(()=>{
    this.posts=arr
  })
}

if(d){
  arr=[];
  console.log(d);
  this.serve.getPostbyDay(d).once('value',(snap)=>{
    snap.forEach((childsnap)=>{
      let v=childsnap.val().postDate.split(' ')[0].split('-')[2] ;
      console.log(v);
      if(d==v)
      {
        arr.push(childsnap.val())
        console.log(childsnap.val())
      }    
       }) 
    }).then(()=>{
      this.posts=[];
       this.posts=arr;
    })
}



}
// checkappar(n:any){
//    let x=this.active_page-n
//    if(3>x&&x>0)
//    {console.log("condtion true",x)}
// let y=n-this.active_page;

//   if(3>y&&y>0){

//   }
// }
}




