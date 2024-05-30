import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { UserService } from './create-user.service';
import { UserComponent } from '../user/user.component';

interface UserData{
    id: string,
    name: string,
    email: string,
    mobileNo: string,
    address: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  contactForm: FormGroup;
  @Input() selectedUser: any = null;
  isEditMode: boolean = false;

  @ViewChild(UserComponent) userTable!: UserComponent;

  constructor(private fb: FormBuilder, private sharedService: SharedService, private userService: UserService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required]
    });

    this.sharedService.userEdit$.subscribe(user => {
      console.log('EDIT ',user)
      this.isEditMode = true;
      this.selectedUser = user;
      this.contactForm.patchValue(user);
    });
    
    this.sharedService.userDelete$.subscribe(user => {
      this.userService.deleteUser(user);
    });


  }

  ngOnInit(): void {}

  onSubmit(): void {    
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);

      const userData = this.contactForm.value;
      if (this.isEditMode) {
        userData.id = this.selectedUser._id;
        this.userService.updateUser(userData).subscribe(
          response => {
            console.log('User updated successfully:', response);
            this.contactForm.reset();
            this.isEditMode = false;
            this.sharedService.userAdded();
          },
          error => {
            console.error('Error updating user:', error);
          }
        );
      }
      else{
      this.userService.saveUser(userData).subscribe(
        response => {
          console.log('User saved successfully:', response);
          this.contactForm.reset();
          this.sharedService.userAdded();
        },
        error => {
          console.error('Error saving user:', error);
        }
      );
      }
    } else {
      console.log('Form is invalid');
    }
  }

}
