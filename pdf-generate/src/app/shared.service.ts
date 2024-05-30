// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userAddedSource = new Subject<void>();
  userAdded$ = this.userAddedSource.asObservable();
  
  private userDeletedSource = new Subject<void>();
  userDeleted$ = this.userDeletedSource.asObservable();

  private userEditSource = new Subject<any>();
  userEdit$ = this.userEditSource.asObservable();

  private userDeleteSource = new Subject<any>();
  userDelete$ = this.userDeleteSource.asObservable();

  userAdded() {
    this.userAddedSource.next();
  }

  userDeleted() {
    this.userAddedSource.next();
  }

  editUser(user: any){
    this.userEditSource.next(user);
  }

  deleteUser(userId: string){
    console.log('inside deleteUser')
    this.userDeleteSource.next(userId);
  }
}
