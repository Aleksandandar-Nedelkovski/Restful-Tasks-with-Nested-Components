import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {
  newTask = {
    title: '',
    description: ''
  }
  constructor(
    private _router: Router,
    private _httpService: HttpService) { }
  ngOnInit() {

  }
  onSubmit() {
    let tempObservable = this._httpService.createTask(this.newTask);
    tempObservable.subscribe(data => {
      this.newTask = { title: '', description: '' }
      this._router.navigate(['/home']);
    })
  }
}