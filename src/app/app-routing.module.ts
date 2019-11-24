import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ApiService } from './api.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate:[ApiService] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'insert', loadChildren: './insert/insert.module#InsertPageModule', canActivate:[ApiService] },
  { path: 'update', loadChildren: './update/update.module#UpdatePageModule', canActivate:[ApiService] },
  { path: 'stat', loadChildren: './stat/stat.module#StatPageModule', canActivate:[ApiService] },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate:[ApiService] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
