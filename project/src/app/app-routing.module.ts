import { SearchComponent } from './component/search/search.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{HomeComponent} from'./component/home/home.component'
import { UsersComponent } from './component/users/users.component';
import { ErrorComponent } from './component/error/error.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AllPostsComponent } from './component/posts/all-posts/all-posts.component';
import { AuthoGuard } from './component/authogard/autho.guard';
import { ProfileComponent } from './component/profile/profile.component';
import { UserInfoComponent } from './component/user-info/user-info.component';
const routes: Routes = [

  {path:'',component:SignInComponent},

  {path:'Home',component:HomeComponent},
  {path:'Users',component:UsersComponent},//canActivate:[AuthoGuard]
  {path:'Users/:type',component: UserDetailsComponent},
  {path:'Search/:type',component:SearchComponent},
   {path:'profile',component:ProfileComponent},
  {path:'SignIn',component:SignInComponent},
  {path:'SignUp',component:SignUpComponent},
  {path:'Allposts',component:AllPostsComponent},
  {path:'UserInfo/:type',component:UserInfoComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
  // exports: [RouterModule ]//PostsModuleModule
})
export class AppRoutingModule { }
