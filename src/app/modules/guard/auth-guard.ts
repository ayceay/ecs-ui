import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../services/authentication.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true; // Allow access if the user is authenticated
        } else {
            this.router.navigate(['/login']).then(); // Redirect to login if not authenticated
            return false; // Prevent access to the route
        }
    }
}
