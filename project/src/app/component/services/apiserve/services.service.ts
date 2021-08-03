import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  mood:any=true
  apearNav:any=false;
optionGovern:any;
SetOptionGovern(g:any){
  this.optionGovern=g
}
getOptionGovern(){
  return this.optionGovern;
}

  constructor(public db:AngularFireDatabase) {
  }
getAllAdmin(){
   return this.db.database.ref('/Admin')
}
AddAdmin(){
  return this.db.list('/Admin')
}
getAllUser(){
  return this.db.database.ref('/Users')
}
getUserById(id:any){
  return this.db.database.ref('/Users').orderByKey().equalTo(id)
}
getAllPosts(){
  return   this.db.database.ref('/Posts')

  // this.db.list('/Posts')
}
AddPost(p:any){
   return this.db.list('/Posts').valueChanges().subscribe().add(p)
  
}
getUsersSametype(){
  return this.db.database.ref('/Users').orderByChild('blood_type')
}


getpostbykey(){
  return this.db.database.ref('/Posts').orderByChild('key')
}
getusersInGovern(){
 return this.db.database.ref('/Users').orderByChild('government')
}
getpostInGovern(g:any){
 return this.db.database.ref('/Posts').orderByChild('government').equalTo(g)

}
 getPostbyDay(d:any){
 return this.db.database.ref('/Posts').orderByChild('postDate')
 .once('value',(snap)=>{
snap.forEach((childsnap)=>{
  let v =childsnap.val().postDate.split(' ')[0].split('-')[2] ;
  if(v==d)
  {
    console.log(childsnap.val())
  }    
   }); 
})

 }
deleteUser(id:any){
   return this.db.database.ref('/Users').orderByKey().equalTo(id)
}
}
// government