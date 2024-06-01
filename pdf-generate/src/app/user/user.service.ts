import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import axios from "axios";
import { Observable } from "rxjs";

interface User {
    _id: string,
    name: string,
    email: string,
    mobileNo: string,
    address: string
}

@Injectable({
    providedIn: 'root'
})
export class UserService{

    constructor(private http: HttpClient) { }
    private apiUrlGetAllUser = 'http://localhost:3000/user/getUsers';
    private apiUrlDeleteUser = 'http://localhost:3000/user/deleteUser';
    private apiUrlGenPdf = 'http://localhost:3000/pdf/generate';
    private apiUrlDownloadPdf = 'http://localhost:3000/pdf/download';
    
    async getUsers(): Promise<any[]> {
        try{
            const response = await axios.get(this.apiUrlGetAllUser);
            const users = response.data;   
            console.log('@### ',users.data) 
            return users.data;        
        }catch(err){
            console.error('Error fetching users : ',err);
            return [];
        }
    }

    deleteUser(userId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrlDeleteUser}/${userId}`);
    }

    generatePdf(user: User): Observable<Blob> {
        return this.http.post(this.apiUrlGenPdf, user, {responseType: 'blob'});
    }

    downloadPdf(fileName: string): Observable<Blob> {
        return this.http.get(`${this.apiUrlDownloadPdf}/${fileName}`, {responseType: 'blob'});
    }

}