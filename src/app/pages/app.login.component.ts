import {Component} from '@angular/core';
import {MessageService} from "primeng/api";
import {AuthService} from "../modules/services/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
})
export class AppLoginComponent {
    username: string;
    password: string;

    constructor(private messageService: MessageService,
                private authService: AuthService,
                private router: Router
    ) {
    }

    login() {
        if (!this.username && !this.password) {
            this.messageService.add({
                severity: 'warning',
                summary: 'Uyarı',
                detail: 'Kullanıcı Ad/Şifre Boş Olmamalı.'
            });
            return;
        }
        this.authService.login(this.username, this.password).subscribe(res => {
            this.authService.setSession(res);
            this.router.navigate(['/']).then();
        });;
    }
}
