import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ProjectComponent } from './components/project/project.component';
import { MediaComponent } from './components/media/media.component';

export const routes: Routes = [
    {path: '', redirectTo:'login',pathMatch:'full'},
    {path: 'register',component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: '', component: ProfileComponent,
        children:[
            {path:'dashboard',component:DashboardComponent}
        ]},
    {path: 'project' ,component:ProjectComponent},
    {path: 'media',component:MediaComponent}
];
