import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => {
        const isAdmin = this.auth.isAdmin(user);
        if (!isAdmin) {
          this.router.navigate(['/inicio']);
        }
        return isAdmin;
      })
    );
  }
}