import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceLoginService } from '../services/service-login.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  profileForm: FormGroup;
  changePassword: boolean = false;

  constructor(private fb: FormBuilder, private authService: ServiceLoginService) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.minLength(5)],
      confirmPassword: ['', Validators.minLength(5)]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Fetch user data and populate form
    this.authService.getUserProfile().subscribe(profile => {
      this.profileForm.patchValue({
        name: profile.name,
        email: profile.email
      });
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      
    const profileData: { name: string; email: string; password?: string } = {
      
        name: formData.name,
        email: formData.email,

      };

      if (this.changePassword) {

        profileData.password = formData.newPassword;

      } 

      this.authService.updateUserProfile(profileData).subscribe(
        () => {
          // Handle success
          console.log('Profile updated successfully');
        },
        error => {
          // Handle error
          console.error('Error updating profile:', error);
        }
      );
    }
  }

  togglePasswordFields(): void {
    this.changePassword = !this.changePassword;
    if (this.changePassword) {
      this.profileForm.get('newPassword')?.setValidators([Validators.required, Validators.minLength(5)]);
      this.profileForm.get('confirmPassword')?.setValidators([Validators.required, Validators.minLength(5)]);
    } else {
      this.profileForm.get('newPassword')?.clearValidators();
      this.profileForm.get('confirmPassword')?.clearValidators();
    }
    this.profileForm.get('newPassword')?.updateValueAndValidity();
    this.profileForm.get('confirmPassword')?.updateValueAndValidity();
  }

  passwordMatchValidator(fg: FormGroup) {
    return fg.get('newPassword')?.value === fg.get('confirmPassword')?.value ? null : { mismatch: true };
  }
}
