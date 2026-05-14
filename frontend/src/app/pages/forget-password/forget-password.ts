import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {
  isLoading = false
  forgetForm;

  constructor(private fb: FormBuilder, private authService: Auth, private toast: ToastrService, private router: Router){
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submitForm(){
    if(this.forgetForm.invalid){
      this.forgetForm.markAllAsTouched
      return;
    }
    this.isLoading = true;
    this.authService.forgetPassword(this.forgetForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.toast.success(res.message)
        localStorage.setItem('resetEmail', this.forgetForm.get('email')?.value || '')
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.error(err.error.message || "Something went wrong")
      }
    })
  }

  get email(){
    return this.forgetForm.get('email')
  }

}
