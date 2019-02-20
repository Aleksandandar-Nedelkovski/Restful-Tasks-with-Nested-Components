import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) {
  }
  createTask(newTask) {
    return this._http.post('/create', newTask)
  }
  getTasks() {
    return this._http.get('/tasks');
  }
  getId(id:any) {
    return this._http.get('/tasks/'+id);
  }
}
