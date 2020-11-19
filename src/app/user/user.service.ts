import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "../models/user";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // URL to web api
  private userUrl = 'http://localhost:5000/api/users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  getUserByUsername(username: any): Observable<User> {
    return this.http.get<User>(this.userUrl+"/username");
  }

  addUser(user: User): Observable<any> {
    return this.http.post<any>(this.userUrl, user, httpOptions);
  }

  updateUserById(user:User, id: any): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${id}`, user, httpOptions);
  }

  deleteUserById(id: any): Observable<User> {
    return this.http.delete<User>(`${this.userUrl}/${id}`);
  }

}
