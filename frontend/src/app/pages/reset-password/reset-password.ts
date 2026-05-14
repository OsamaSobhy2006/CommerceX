import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  isLoading = false;
  token: string = ''
  resetForm;

  constructor(private fb: FormBuilder, private authService: Auth, private toast: ToastrService, private router: Router, private activateRoute: ActivatedRoute)
  {
    this.token = this.activateRoute.snapshot.params['token'];
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  submitForm(){
    if(this.resetForm.invalid){
      this.resetForm.markAllAsTouched()
      return;
    }

    const body = {
      password: this.resetForm.get('password')?.value
    }
    this.isLoading = true;
    this.authService.resetPassword(this.token, body).pipe(
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe({
      next: (res: any) => {
        this.toast.success(res.message || "Password reset successfully")
        this.router.navigateByUrl('/login')
      },
      error: (err) => {
        this.toast.error(err.error.message || "Something went wrong")
      }
    })
  }

  get password(){
    return this.resetForm.get('password')
  }
  get confirmPassword(){
    return this.resetForm.get('confirmPassword')
  }

}
