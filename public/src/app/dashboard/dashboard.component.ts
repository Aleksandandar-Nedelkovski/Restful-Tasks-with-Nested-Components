import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks = [];
  selectedTask = null;
  constructor(private _httpService: HttpService) {
    this.getAllTasks();
  } 

  ngOnInit() {
  }

  getAllTasks() {
    let tempObservable = this._httpService.getTasks()
    tempObservable.subscribe(data => {
      this.tasks = data['data'];
    });
  }
  
  onButtonClick(): void {
    let tempObservable = this._httpService.getTasks()
    tempObservable.subscribe(data => {
      this.tasks = data['data'];
    });
  }

  onButtonClickParams(task:any): void {
    console.log('display Task', task)
    this.selectedTask = task;
  }
}
