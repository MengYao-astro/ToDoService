import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  BaseUrl = 'https://localhost:5001/'
  constructor(private http: HttpClient) { }

  create(todoItem: ToDoItem): Observable<void> {
    return this.http.post<void>( `${this.BaseUrl}todos`, todoItem)
  }

  getById(id: number): Observable<ToDoItem>{
    return this.http.get<ToDoItem>( `${this.BaseUrl}todos/${id}`)
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`https://localhost:5001/todos/${id}`);
  }
}
