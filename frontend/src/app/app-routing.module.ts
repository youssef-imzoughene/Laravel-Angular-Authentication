import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './components/login/login.component'
import { SignupComponent} from  './components/signup/signup.component'
import { ProfileComponent} from './components/profile/profile.component'
import { RequestResetComponent} from './components/password/request-reset/request-reset.component'
import { ResponseResetComponent} from './components/password/response-reset/response-reset.component'
import { AuthGuard } from './guards/auth.guard'
import { NotauthGuard} from './guards/notauth.guard'
const appRoutes: Routes = [
	//{ path: '', redirectTo: 'pokemon/list', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }
  { path: 'login', component: LoginComponent,canActivate:[NotauthGuard] },
  { path: 'signup', component: SignupComponent,canActivate:[NotauthGuard]  },
  { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]  },
  { path: 'request-password-reset', component: RequestResetComponent,canActivate:[NotauthGuard]  },
  { path: 'response-password-reset', component: ResponseResetComponent,canActivate:[NotauthGuard]  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
