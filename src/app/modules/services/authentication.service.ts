// import * as moment from "moment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../base-service";

@Injectable({
    providedIn: "root",
})
export class AuthService {

    constructor(private http: HttpClient, private baseService: BaseService) {

    }

    login(username: string, password: string) {
        const endpoint =  this.baseService.rootUrl + "/users/login";
        return this.http.post<string>(endpoint, {username: username, password: password});

    }

    setSession(authResult) {
        // const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult);
        // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem("id_token");
        // localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        // return moment().isBefore(this.getExpiration());
        return !!localStorage.getItem('id_token');
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    // getExpiration() {
    //     const expiration = localStorage.getItem("expires_at");
    //     const expiresAt = JSON.parse(expiration);
    //     return moment(expiresAt);
    // }
}
