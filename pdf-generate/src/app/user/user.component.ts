import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { UserService as createUser } from '../form/create-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';

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

  constructor(private userService: UserService, private sharedService: SharedService, private snackBar: MatSnackBar, private dialog: MatDialog) { 
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

  genPdf(user: any): void {
    this.userService.generatePdf(user).subscribe(
      response => {
        console.log('PDF generated successfully:', response);   
        this.showSuccessNotification('PDF Generated successfully!');     
      },
      error => {
        console.error('Error generating pdf:', error);
        this.showErrorNotification('PDF Generat Failed!');
      }
    );
  }

  downloadPdf(fileName: string): void {
    this.userService.downloadPdf(fileName+'.pdf').subscribe((blob: Blob) => {
      console.log("BLOBBB  ",blob)
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  // Assuming you have a method to fetch updated data from a service
async refreshComponentData() {
  this.users = await this.userService.getUsers();  
  };


  showSuccessNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  showErrorNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  openPdfPopup(user: User): void {
    const dialogRef = this.dialog.open(PdfViewerComponent, {
      width: '80%',
      height: '80%',
      data: { user } // Pass userId to Component C
    });
  }
  
}



