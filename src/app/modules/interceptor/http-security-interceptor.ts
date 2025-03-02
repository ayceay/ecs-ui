import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {AuthService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class HttpSecurityInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let accessToken = this.authService.getSession();

        if (accessToken) {
            // Apply the headers
            req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
            });
        }

        return next.handle(req).pipe(catchError(x => this.handleAuthError(x)));
        // send cloned request with header to the next handler.
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401) {
            //navigate /delete cookies or whatever
            this.router.navigateByUrl(`/login`).then();
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message); // or EMPTY may be appropriate here
        }
        if (err.status === 403) {
            //navigate /delete cookies or whatever
            this.router.navigateByUrl(`/403`).then();
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message); // or EMPTY may be appropriate here
        }
        return throwError(() => err);
    }
}
