// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserData{
  id:string,
  name: string,
    email: string,
    mobileNo: string,
    address: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrlSaveUser = 'http://localhost:3000/user/createUser';
    private apiUrlUpdateUser = 'http://localhost:3000/user/updateUser';
    private apiUrlDeleteUser = 'http://localhost:3000/user/deleteUser';

    constructor(private http: HttpClient) { }

  saveUser(userData: UserData): Observable<UserData> {
    return this.http.post<any>(this.apiUrlSaveUser, userData);
  }

  updateUser(userData: UserData): Observable<UserData> {
    return this.http.post<any>(this.apiUrlUpdateUser, userData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.get<any>(this.apiUrlDeleteUser+'/'+userId);
  }
}
