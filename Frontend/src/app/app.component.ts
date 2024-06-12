import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './components/media/media.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StorageComponent } from './components/storage/storage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProjectComponent,
    LoginComponent,
    FormsModule,
    DashboardComponent,
    RegisterComponent,
    CommonModule,
    ProjectComponent,
    MediaComponent,
    NavbarComponent,
    StorageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
