import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            this.router.navigate(['/login']);
            return false;
        }

        return this.authService.verifyToken(accessToken).pipe(
            map((response: any) => {
                // Si el token es válido
                return true;
            }),
            catchError((error) => {
                if (error.status === 401) {
                    // Si el token no es válido, intenta refrescarlo
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (refreshToken) {
                        return this.authService.refreshToken(refreshToken).pipe(
                            map((res: any) => {
                                localStorage.setItem('accessToken', res.access);
                                return true;
                            }),
                            catchError((refreshError) => {
                                // Si la actualización falla, redirige al login
                                this.router.navigate(['/login']);
                                return of(false);
                            })
                        );
                    }
                }
                // Para cualquier otro error, redirige al login
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }
}
