import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class HttpSecurityInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Apply the headers
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImE1IiwiaWF0IjoxNzM0NjM4MTQ5LCJuYmYiOjE3MzQ2MzgxNDksImV4cCI6MTczNDcyNDU0OSwiYXVkIjoiaHR0cDovL2Vjc3BsdXMuY29tLnRyIiwiaXNzIjoiaHR0cDovL3d3dy5lY3NwbHVzLmNvbS50ciJ9.lQ4-5OIpZZ3yyzAXd9R_lImCajFKMW2WYfvcFN8qZm4')
        });

        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}
