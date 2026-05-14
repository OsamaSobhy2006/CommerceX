import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm;
  constructor(private fb:FormBuilder, private _authService: Auth, private toast: ToastrService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]] ,
      email: ['', [Validators.required, Validators.email]] ,
      password: ['', [Validators.required, Validators.minLength(6)]] ,
      confirmPassword: ['', Validators.required]
    },{
      validators: this.passwordMatchValidator
    });
  }
  onSubmit(){
  if(this.signupForm.invalid){
    this.signupForm.markAllAsTouched();
    return;
  }
  this._authService.signUp(this.signupForm.value).subscribe({
    next: () => {
      this.toast.success("User Added Successfully");
      localStorage.setItem(
        'email',
        this.signupForm.value.email!
      );
      this.signupForm.reset();
      this.router.navigateByUrl('/confirm-email');
    },
    error: (err) => {
      this.toast.error(err.error.message);
    }
  })
}

  passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password !== confirmPassword){
      return {
        passwordMismatch: true
      };
    }
    return null;
}
}
