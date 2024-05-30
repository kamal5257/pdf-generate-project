import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { UserService as createUser } from '../form/create-user.service';


interface User {
  id: string,
  name: string,
  email: string,
  mobileNo: string,
  address: string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  private refreshSubscription: Subscription;
  selectedUser: any = null;

  constructor(private userService: UserService, private sharedService: SharedService) { 
    this.refreshSubscription = this.sharedService.userAdded$.subscribe(() => {
      // Refresh logic for the component
      this.loadUsers();
    });

    this.refreshSubscription = this.sharedService.userDeleted$.subscribe(() => {
      // Refresh logic for the component
      this.loadUsers();
    });
  }
  fetchData() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
      this.users = await this.userService.getUsers();
      console.warn('RESULT : ',this.users)
    
  }

  onEditUser(user: any): void {
    this.selectedUser = user;
    this.sharedService.editUser(user);
  }

  onDeleteUser(user: any): void {
    this.userService.deleteUser(user._id).subscribe(
      response => {
        console.log('User deleted successfully:', response);
        this.loadUsers();
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }

  // Assuming you have a method to fetch updated data from a service
async refreshComponentData() {
  this.users = await this.userService.getUsers();  
  };

  
}



