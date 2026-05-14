import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth)
  const router = inject(Router)
  const toast = inject(ToastrService)

  if(authService.isAdmin)
    return true

  toast.error("Only Admins access this page")
  router.navigateByUrl('/home')
  return false
};
