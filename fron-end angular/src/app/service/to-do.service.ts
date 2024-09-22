import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.development'
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
   api = environment.apiUrl

  constructor(private http:HttpClient) { }

  getData():Observable<Task[]>{
  //  return this.http.get<Task[]>(this.api)
  return this.http.get<Task[]>(this.api).pipe(
    catchError((error) => {
      console.error('Error occurred while fetching tasks:', error);
      // Handle error as needed, e.g., returning an empty array
      return of([]); // Return an empty array on error
    })
  );
  }

  addData(record:any){
   return this.http.post(this.api+"/add",record)
  }

  updateData(id:number,recotd:any):Observable<Task[]>{
    return this.http.put<Task[]>(this.api+`/update/${id}`,recotd)
  }

  deleteData(id:any){
   return this.http.delete(this.api+`/delete/${id}`)
  }



}
