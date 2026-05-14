import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm;
  constructor(private fb:FormBuilder, private _authService: Auth, private toast: ToastrService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]] ,
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
  if(this.loginForm.invalid){
    this.loginForm.markAllAsTouched();
    return;
  }
  this._authService.login(this.loginForm.value).subscribe({
    next: (res: any) => {
      this.toast.success("Login Successfully");
      localStorage.setItem('token', res.token);
      this._authService.saveCurrentUser();
      this.router.navigateByUrl('/').then(() => {
        window.location.reload()
      })
    },
    error: (err) => {
      this.toast.error(err.error.message);
    }
  })
}
}
