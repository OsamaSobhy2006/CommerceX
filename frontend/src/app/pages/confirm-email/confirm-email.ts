import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  imports: [ReactiveFormsModule],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.css',
})
export class ConfirmEmail {
  otpForm;
  constructor(private fb: FormBuilder, private _authService: Auth, private toast: ToastrService, private router: Router){
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]]
    })
  }

  onSubmit(){
  if(this.otpForm.invalid){
    this.otpForm.markAllAsTouched();
    return;
  }
  const data = {
    email: localStorage.getItem('email'),
    confirmOTP: this.otpForm.value.otp
  }
  this._authService.verifyOtp(data).subscribe({
    next: () => {
      this.toast.success("Account Activated Successfully")
      this.router.navigateByUrl("/login")
    },
    error: (err) => {
      this.toast.error(err.error.message)
    }
  })
}
}
