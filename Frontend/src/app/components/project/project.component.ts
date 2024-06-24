import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{

  projects: any[] = [];
  errorMessage: string = '';

  constructor(private api:ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.api.getProjects().subscribe((response:any)=>{
      this.projects = response
      console.log(this.projects)
    },
    error => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Failed to load projects. ' + error.message;
        console.log(this.errorMessage)
      }
    })
  };
}